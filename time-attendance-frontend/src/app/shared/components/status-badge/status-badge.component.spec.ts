import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBadgeComponent } from './status-badge.component';
import { I18nService } from '../../../core/i18n/i18n.service';

describe('StatusBadgeComponent', () => {
  let component: StatusBadgeComponent;
  let fixture: ComponentFixture<StatusBadgeComponent>;

  // The badge's `effectiveConfig` calls `i18n.t(i18nKey)` to translate the
  // default label for a known status. A stub that echoes the key back is enough
  // to exercise the render path without pulling in real translations.
  const i18nStub = {
    t: (key: string) => key,
    locale: () => 'en',
    isRtl: () => false,
    setLocale: () => { /* noop */ }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBadgeComponent],
      providers: [{ provide: I18nService, useValue: i18nStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusBadgeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a known status using the .erp-badge class and the translated i18n key', () => {
    component.status = 'Approved';
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('.erp-badge');
    expect(badge)
      .withContext('the component renders an .erp-badge span, not Bootstrap .badge')
      .toBeTruthy();

    // statusStyleMap['approved'].i18nKey === 'common.statuses.approved'.
    // The i18n stub echoes the key back, so the translated label is that key.
    expect(badge.textContent).toContain('common.statuses.approved');
  });

  it('falls back to the raw status string when no preset matches and no label provided', () => {
    component.status = 'NotAStandardStatus';
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('.erp-badge');
    expect(badge.textContent).toContain('NotAStandardStatus');
  });

  it('uses the explicit label input over the status preset', () => {
    component.status = 'Approved';
    component.label = 'Custom Label';
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('.erp-badge');
    expect(badge.textContent).toContain('Custom Label');
    expect(badge.textContent).not.toContain('common.statuses.approved');
  });
});
