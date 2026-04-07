import { Injectable, inject, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Notification } from '../../shared/models/notification.model';

/**
 * Service for managing SignalR connections and real-time notifications.
 */
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection | null = null;
  private readonly authService = inject(AuthService);

  /** Signal indicating connection status */
  isConnected = signal<boolean>(false);

  /** Signal for received notifications */
  newNotification = signal<Notification | null>(null);

  /** Signal for unread count updates */
  unreadCount = signal<number>(0);

  /**
   * Starts the SignalR connection.
   * Should be called after user authentication.
   */
  async startConnection(): Promise<void> {
    if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
      return;
    }

    const token = this.authService.getAccessToken();
    if (!token) {
      console.warn('Cannot start SignalR connection: No access token');
      return;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/hubs/notifications`, {
        accessTokenFactory: () => this.authService.getAccessToken() || '',
        // Force LongPolling - JWT token (10KB+) exceeds URL length limits for WebSocket/SSE query strings.
        // LongPolling sends the token via HTTP headers which have no size limit.
        transport: signalR.HttpTransportType.LongPolling
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    this.registerHandlers();

    try {
      await this.hubConnection.start();
      this.isConnected.set(true);
    } catch (error) {
      // Silently handle connection failure - will auto-retry via reconnect
      this.isConnected.set(false);
    }
  }

  /**
   * Stops the SignalR connection.
   */
  async stopConnection(): Promise<void> {
    if (this.hubConnection) {
      try {
        await this.hubConnection.stop();
        this.isConnected.set(false);
      } catch (error) {
        // Silently handle disconnection errors
      }
    }
  }

  /**
   * Registers event handlers for SignalR messages.
   */
  private registerHandlers(): void {
    if (!this.hubConnection) return;

    this.hubConnection.on('ReceiveNotification', (notification: Notification) => {
      this.newNotification.set(notification);
    });

    this.hubConnection.on('UnreadCountUpdated', (count: number) => {
      this.unreadCount.set(count);
    });

    this.hubConnection.onreconnecting(() => {
      this.isConnected.set(false);
    });

    this.hubConnection.onreconnected(() => {
      this.isConnected.set(true);
    });

    this.hubConnection.onclose(() => {
      this.isConnected.set(false);
      // Attempt reconnection after 5 seconds if user is still authenticated
      setTimeout(() => {
        if (this.authService.getAccessToken()) {
          this.startConnection();
        }
      }, 5000);
    });
  }
}
