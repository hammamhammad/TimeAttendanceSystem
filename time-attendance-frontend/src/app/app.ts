import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './core/i18n/i18n.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(private i18n: I18nService) {}

  ngOnInit(): void {
    // Initialize i18n with default locale
    const savedLocale = (localStorage.getItem('app_locale') as 'en' | 'ar') || 'en';
    this.i18n.setLocale(savedLocale);
  }
}
