import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ElementRef,
  ViewChild,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

// Fix Leaflet default marker icon paths for bundled apps
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/marker-icon.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png',
});

@Component({
  selector: 'app-location-picker',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.css']
})
export class LocationPickerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() latitude: number | null = null;
  @Input() longitude: number | null = null;
  @Input() radiusMeters: number = 100;
  @Input() readonly: boolean = false;
  @Input() height: string = '400px';
  @Input() placeholder: string = '';

  @Output() locationChange = new EventEmitter<{ latitude: number; longitude: number }>();

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  searchQuery = '';
  searching = false;
  isExpanded = false;

  private map: L.Map | null = null;
  private marker: L.Marker | null = null;
  private circle: L.Circle | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private updatingFromClick = false;

  // Default center: Riyadh, Saudi Arabia
  private readonly defaultCenter: L.LatLngExpression = [24.7136, 46.6753];
  private readonly defaultZoom = 6;
  private readonly locationZoom = 16;

  get hasLocation(): boolean {
    return this.latitude != null && this.longitude != null;
  }

  ngAfterViewInit(): void {
    // Use requestAnimationFrame to ensure the container has been laid out
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.initMap();
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map) return;

    if (this.updatingFromClick) {
      this.updatingFromClick = false;
      return;
    }

    if (changes['latitude'] || changes['longitude']) {
      this.updateMarkerPosition();
    }

    if (changes['radiusMeters']) {
      this.updateCircleRadius();
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.map?.remove();
    this.map = null;
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
    setTimeout(() => this.map?.invalidateSize(), 350);
  }

  async onSearch(): Promise<void> {
    if (!this.searchQuery.trim() || !this.map) return;

    this.searching = true;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.searchQuery)}&limit=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const results = await response.json();

      if (results && results.length > 0) {
        const { lat, lon } = results[0];
        const parsedLat = parseFloat(parseFloat(lat).toFixed(6));
        const parsedLng = parseFloat(parseFloat(lon).toFixed(6));

        this.addMarkerAndCircle(parsedLat, parsedLng);
        this.map.setView([parsedLat, parsedLng], this.locationZoom);

        if (!this.readonly) {
          this.updatingFromClick = true;
          this.locationChange.emit({ latitude: parsedLat, longitude: parsedLng });
        }
      }
    } catch {
      // Silently fail - search is best-effort
    } finally {
      this.searching = false;
    }
  }

  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSearch();
    }
  }

  centerOnLocation(): void {
    if (this.map && this.hasLocation) {
      this.map.setView([this.latitude!, this.longitude!], this.locationZoom, { animate: true });
    }
  }

  private initMap(): void {
    const el = this.mapContainer.nativeElement;

    this.map = L.map(el, {
      center: this.hasLocation
        ? [this.latitude!, this.longitude!]
        : this.defaultCenter,
      zoom: this.hasLocation ? this.locationZoom : this.defaultZoom,
      zoomControl: false,
      attributionControl: true
    });

    L.control.zoom({ position: 'topright' }).addTo(this.map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(this.map);

    if (this.hasLocation) {
      this.addMarkerAndCircle(this.latitude!, this.longitude!);
    }

    if (!this.readonly) {
      this.map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        const roundedLat = parseFloat(lat.toFixed(6));
        const roundedLng = parseFloat(lng.toFixed(6));

        this.addMarkerAndCircle(roundedLat, roundedLng);

        this.updatingFromClick = true;
        this.locationChange.emit({ latitude: roundedLat, longitude: roundedLng });
      });
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.map?.invalidateSize();
    });
    this.resizeObserver.observe(el);

    // Force invalidateSize to ensure tiles load correctly
    this.map.invalidateSize();
    setTimeout(() => this.map?.invalidateSize(), 100);
  }

  private addMarkerAndCircle(lat: number, lng: number): void {
    if (!this.map) return;

    const position: L.LatLngExpression = [lat, lng];

    if (this.marker) {
      this.marker.setLatLng(position);
    } else {
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: '<div class="marker-pin"></div>',
        iconSize: [36, 44],
        iconAnchor: [18, 44],
        popupAnchor: [0, -44]
      });

      this.marker = L.marker(position, {
        draggable: !this.readonly,
        icon: customIcon
      }).addTo(this.map);

      if (!this.readonly) {
        this.marker.on('dragend', () => {
          const pos = this.marker!.getLatLng();
          const roundedLat = parseFloat(pos.lat.toFixed(6));
          const roundedLng = parseFloat(pos.lng.toFixed(6));

          if (this.circle) {
            this.circle.setLatLng([roundedLat, roundedLng]);
          }

          this.updatingFromClick = true;
          this.locationChange.emit({ latitude: roundedLat, longitude: roundedLng });
        });
      }
    }

    if (this.circle) {
      this.circle.setLatLng(position);
      this.circle.setRadius(this.radiusMeters);
    } else {
      this.circle = L.circle(position, {
        radius: this.radiusMeters,
        color: '#4F6BF6',
        fillColor: '#4F6BF6',
        fillOpacity: 0.12,
        weight: 2,
        dashArray: '6, 4'
      }).addTo(this.map);
    }
  }

  private updateMarkerPosition(): void {
    if (this.hasLocation) {
      this.addMarkerAndCircle(this.latitude!, this.longitude!);
      this.map?.setView(
        [this.latitude!, this.longitude!],
        this.map.getZoom() < this.locationZoom ? this.locationZoom : this.map.getZoom()
      );
    } else {
      if (this.marker) {
        this.marker.remove();
        this.marker = null;
      }
      if (this.circle) {
        this.circle.remove();
        this.circle = null;
      }
    }
  }

  private updateCircleRadius(): void {
    if (this.circle) {
      this.circle.setRadius(this.radiusMeters);
    }
  }
}
