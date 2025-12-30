import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationComponent } from './core/confirmation/confirmation.component';
import { NotificationComponent } from './core/notifications/notification.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConfirmationComponent, NotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('time-attendance-selfservice-frontend');
}
