import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { MatSidenavModule, MatIconModule, MatMenuModule, MatToolbarModule,
  MatExpansionModule } from '@angular/material';
  import { NoopAnimationsModule } from '@angular/platform-browser/animations';
  
import { SidenavComponent } from './components/HUD/sidenav/sidenav.component';
import { NavMenuComponent } from './components/HUD/nav-menu/nav-menu.component';
import {AppComponent} from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatSidenavModule, MatIconModule, MatMenuModule,
        MatToolbarModule, MatExpansionModule,
        RouterTestingModule, NoopAnimationsModule,
        HttpClientTestingModule],
      declarations: [
        AppComponent, SidenavComponent, NavMenuComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'rev-theme'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('rev-theme');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to rev-theme!');
  });
});
