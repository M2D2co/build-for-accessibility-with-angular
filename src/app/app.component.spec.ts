import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ RouterTestingModule, MaterialModule ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should include a skip link', () => {
    const skipLink: HTMLElement = fixture.debugElement.nativeElement.querySelector('a.skip-link');
    expect(skipLink).toBeTruthy();
  });

  it('should include a main id for skip link to link to', () => {
    const main: HTMLElement = fixture.debugElement.nativeElement.querySelector('#main');
    expect(main).toBeTruthy();
  });

  it('should include the header component', () => {
    const header: HTMLElement = fixture.debugElement.nativeElement.querySelector('app-header');
    expect(header).toBeTruthy();
  });

  it('should include the nav component', () => {
    const nav: HTMLElement = fixture.debugElement.nativeElement.querySelector('app-nav');
    expect(nav).toBeTruthy();
  });

  it('should include the router outlet', () => {
    const outlet: HTMLElement = fixture.debugElement.nativeElement.querySelector('router-outlet');
    expect(outlet).toBeTruthy();
  });

  it('should include the footer component', () => {
    const footer: HTMLElement = fixture.debugElement.nativeElement.querySelector('app-footer');
    expect(footer).toBeTruthy();
  });

});
