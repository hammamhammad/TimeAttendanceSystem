import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance-statistics',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Attendance Statistics - Under Development</div>`,
  styles: [`
    div {
      padding: 20px;
      text-align: center;
      color: #666;
    }
  `]
})
export class AttendanceStatisticsComponent {
}