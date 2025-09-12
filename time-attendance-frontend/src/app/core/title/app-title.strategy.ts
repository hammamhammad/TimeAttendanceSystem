import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { I18nService } from '../i18n/i18n.service';

@Injectable({
  providedIn: 'root'
})
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly i18n = inject(I18nService);

  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
    
    if (title) {
      // If title is a translation key, translate it
      const translatedTitle = this.i18n.t(title);
      const finalTitle = `${translatedTitle} | Time Attendance System`;
      this.title.setTitle(finalTitle);
    } else {
      this.title.setTitle('Time Attendance System');
    }
  }
}