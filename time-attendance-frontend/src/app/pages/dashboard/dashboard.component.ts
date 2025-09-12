import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';
import { I18nService } from '../../core/i18n/i18n.service';

interface DashboardCard {
  title: string;
  value: number;
  icon: string;
  color: string;
  change?: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  currentUser = computed(() => this.authService.currentUser());
  loading = signal(true);
  
  dashboardCards = signal<DashboardCard[]>([]);

  constructor(
    private authService: AuthService,
    public i18n: I18nService
  ) {}

  ngOnInit(): void {
    // Initialize dashboard cards
    this.dashboardCards.set([
      {
        title: this.t('dashboard.total_users'),
        value: 0,
        icon: 'fa-solid fa-users',
        color: 'primary'
      },
      {
        title: this.t('dashboard.total_employees'),
        value: 0,
        icon: 'fa-solid fa-user-tie',
        color: 'success'
      },
      {
        title: this.t('dashboard.active_sessions'),
        value: 0,
        icon: 'fa-solid fa-clock',
        color: 'info'
      },
      {
        title: this.t('dashboard.recent_activities'),
        value: 0,
        icon: 'fa-solid fa-chart-line',
        color: 'warning'
      }
    ]);
    
    this.loadDashboardData();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  private async loadDashboardData(): Promise<void> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      this.dashboardCards.update(cards => [
        { ...cards[0], value: 25 },
        { ...cards[1], value: 150 },
        { ...cards[2], value: 12 },
        { ...cards[3], value: 8 }
      ]);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      this.loading.set(false);
    }
  }

  getCardColorClass(color: string): string {
    return `card-${color}`;
  }
}