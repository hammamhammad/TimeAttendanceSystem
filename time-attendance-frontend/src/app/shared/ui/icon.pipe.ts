import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon',
  standalone: true
})
export class IconPipe implements PipeTransform {
  private iconMap: { [key: string]: string } = {
    // Navigation icons
    'dashboard': 'fa-solid fa-chart-line',
    'users': 'fa-solid fa-users',
    'employees': 'fa-solid fa-user-tie',
    'settings': 'fa-solid fa-cog',
    'logout': 'fa-solid fa-sign-out-alt',
    
    // Action icons
    'create': 'fa-solid fa-plus',
    'edit': 'fa-solid fa-edit',
    'delete': 'fa-solid fa-trash',
    'save': 'fa-solid fa-floppy-disk',
    'cancel': 'fa-solid fa-times',
    'search': 'fa-solid fa-search',
    'refresh': 'fa-solid fa-refresh',
    
    // Status icons
    'success': 'fa-solid fa-check-circle',
    'warning': 'fa-solid fa-exclamation-triangle',
    'error': 'fa-solid fa-times-circle',
    'info': 'fa-solid fa-info-circle',
    
    // UI icons
    'menu': 'fa-solid fa-bars',
    'close': 'fa-solid fa-times',
    'expand': 'fa-solid fa-chevron-down',
    'collapse': 'fa-solid fa-chevron-up',
    'language': 'fa-solid fa-globe',
    'profile': 'fa-solid fa-user',
    
    // Form icons
    'email': 'fa-solid fa-envelope',
    'password': 'fa-solid fa-lock',
    'username': 'fa-solid fa-user',
    'phone': 'fa-solid fa-phone',
    'date': 'fa-solid fa-calendar'
  };

  transform(key: string): string {
    return this.iconMap[key] || key;
  }
}