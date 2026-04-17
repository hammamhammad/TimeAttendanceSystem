import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { I18nService } from './core/i18n/i18n.service';

describe('App', () => {
  // Minimal stub — App.ngOnInit only reads localStorage and calls setLocale.
  const i18nStub = {
    setLocale: jasmine.createSpy('setLocale'),
    locale: () => 'en',
    isRtl: () => false,
    t: (k: string) => k
  };

  beforeEach(async () => {
    localStorage.removeItem('app_locale');
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: I18nService, useValue: i18nStub },
        provideRouter([])
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('renders the router-outlet shell (no default title text)', () => {
    // The real shell template is a single <router-outlet /> — authentication
    // and layout live in child routes. The spec just confirms the shell
    // renders cleanly; the old "Hello, time-attendance-frontend" assertion
    // was a leftover from `ng new` and never matched this app.
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('defaults locale to "en" when localStorage is empty', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(i18nStub.setLocale).toHaveBeenCalledWith('en');
  });
});
