import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material/material.module';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ MaterialModule ],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should include app logo', () => {
    const logo = fixture.debugElement.nativeElement.querySelector('img.logo');
    expect(logo).toBeTruthy();
  });

  it('should include app title', () => {
    const title = fixture.debugElement.nativeElement.querySelector('.app-name');
    expect(title.innerText).toContain('Build For Accessibility Using Angular');
  });

  it('should include a h1', () => {
    const h1 = fixture.debugElement.nativeElement.querySelector('h1');
    expect(h1).toBeTruthy();
  });
});
