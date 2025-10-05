import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface UserSession {
  sessionId: string;
  username: string;
  email: string;
  deviceName: string;
  platform: string;
  browser: string;
  ipAddress: string;
  location: string;
  lastAccessedAtUtc: string;
  createdAtUtc: string;
  isCurrentSession: boolean;
  isActive: boolean;
}

export interface SessionsResponse {
  sessions: UserSession[];
}

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/v1`;

  /**
   * Get all active sessions for the current user
   */
  getUserSessions(): Observable<UserSession[]> {
    return this.http.get<SessionsResponse>(`${this.apiUrl}/sessions`)
      .pipe(
        map(response => response.sessions || [])
      );
  }

  /**
   * Terminate a specific session
   */
  terminateSession(sessionId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/sessions/${sessionId}`);
  }

  /**
   * Terminate all sessions except the current one
   */
  terminateAllOtherSessions(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/sessions/terminate-all`);
  }
}
