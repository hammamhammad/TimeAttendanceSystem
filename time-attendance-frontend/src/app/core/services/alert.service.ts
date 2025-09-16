import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  success(message: string): void {
    console.log('Success:', message);
    // You can implement toast notifications here
    // For now, using console.log as placeholder
  }

  error(message: string): void {
    console.error('Error:', message);
    // You can implement toast notifications here
    // For now, using console.error as placeholder
  }

  warning(message: string): void {
    console.warn('Warning:', message);
    // You can implement toast notifications here
    // For now, using console.warn as placeholder
  }

  info(message: string): void {
    console.info('Info:', message);
    // You can implement toast notifications here
    // For now, using console.info as placeholder
  }
}