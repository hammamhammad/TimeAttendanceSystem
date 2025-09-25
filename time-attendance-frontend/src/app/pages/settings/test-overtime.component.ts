import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-overtime',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid">
      <h1>🎉 Test Overtime Component Works!</h1>
      <p>This is a test component to verify routing works.</p>
      <div class="alert alert-success">
        ✅ If you can see this, the route is working correctly!
      </div>
    </div>
  `
})
export class TestOvertimeComponent {
}