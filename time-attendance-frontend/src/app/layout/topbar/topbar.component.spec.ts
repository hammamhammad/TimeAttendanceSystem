import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TopbarComponent } from './topbar.component';
import { AuthService } from '../../core/auth/auth.service';
import { I18nService } from '../../core/i18n/i18n.service';

/**
 * Phase 6 (v14.6): verifies the new top-nav omnibox behavior.
 * Focus:
 *   - Enter on a 2+ char query navigates to /global-search with ?q=…
 *   - Enter on a <2 char query is a no-op (mirrors backend min-length)
 *   - Ctrl+K focuses the omnibox input from anywhere on the page
 *
 * This spec also validates the minimum practical Angular component-test setup
 * for the repo; future Phase 6+ specs can follow the same shape.
 */
describe('TopbarComponent — omnibox (Phase 6)', () => {
  let fixture: ComponentFixture<TopbarComponent>;
  let component: TopbarComponent;
  let routerNavigateSpy: jasmine.Spy;

  // Minimal stubs — the topbar only reads tiny surface areas from these services.
  // `getAccessToken` is reached by the transitively-imported NotificationBell service;
  // returning null short-circuits the SignalR connection attempt.
  const authStub = {
    currentUser: () => ({ username: 'tester' }),
    logout: () => { /* noop */ },
    getAccessToken: () => null,
    isAuthenticated: () => false
  };
  const i18nStub = {
    locale: () => 'en',
    isRtl: () => false,
    t: (k: string) => k,
    setLocale: () => { /* noop */ }
  };
  const routerStub = {
    events: new Subject<any>(),
    routerState: { root: { snapshot: { data: {} }, firstChild: null } },
    navigate: (_commands: any[], _extras?: any) => Promise.resolve(true)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarComponent],
      providers: [
        { provide: AuthService, useValue: authStub },
        { provide: I18nService, useValue: i18nStub },
        { provide: Router, useValue: routerStub },
        // NotificationBellComponent (imported by TopbarComponent) needs HttpClient.
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    // Attach the fixture's DOM to document so HostListener('document:keydown')
    // and document.getElementById('topbar-omnibox') see the rendered input.
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();

    const injectedRouter = TestBed.inject(Router);
    routerNavigateSpy = spyOn(injectedRouter, 'navigate').and.callThrough();
  });

  afterEach(() => {
    if (fixture?.nativeElement?.parentNode) {
      fixture.nativeElement.parentNode.removeChild(fixture.nativeElement);
    }
  });

  it('renders the omnibox input', () => {
    const input = fixture.nativeElement.querySelector('#topbar-omnibox');
    expect(input).toBeTruthy();
  });

  it('navigates to /global-search on submit with a 2+ char query', () => {
    component.searchQuery.set('Ah');
    component.onSearchSubmit();
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/global-search'], { queryParams: { q: 'Ah' } });
  });

  it('does not navigate when query is too short (< 2 chars)', () => {
    component.searchQuery.set('a');
    component.onSearchSubmit();
    expect(routerNavigateSpy).not.toHaveBeenCalled();
  });

  it('trims whitespace before length check', () => {
    component.searchQuery.set('   ');
    component.onSearchSubmit();
    expect(routerNavigateSpy).not.toHaveBeenCalled();

    component.searchQuery.set('  hi  ');
    component.onSearchSubmit();
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/global-search'], { queryParams: { q: 'hi' } });
  });

  it('Ctrl+K focuses the omnibox from the document', fakeAsync(() => {
    const input = fixture.nativeElement.querySelector('#topbar-omnibox') as HTMLInputElement;
    // Put focus elsewhere first.
    document.body.focus();
    expect(document.activeElement).not.toBe(input);

    const evt = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true });
    document.dispatchEvent(evt);
    tick();

    expect(document.activeElement).toBe(input);
  }));
});
