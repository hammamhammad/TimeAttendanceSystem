import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance-reports',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Attendance Reports - Under Development</div>`,
  styles: [`
    div {
      padding: 20px;
      text-align: center;
      color: #666;
    }
  `]
})
export class AttendanceReportsComponent {
}