import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { MaterialModule } from '../../material/material.module';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ MaterialModule ],
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('links should have inner text', () => {
    const links = fixture.debugElement.nativeElement.querySelectorAll('a');
    const emptyLinks = Array.from(links).some((a: HTMLElement) => !a.innerText);
    expect(emptyLinks).toBeFalsy();
  });

  it('should include copyright', () => {
    const copyright = fixture.debugElement.nativeElement.querySelector('div.copyright');
    expect(copyright.innerText).toEqual('Copyright © 2020-22 M2D2 Enterprises');
  });
});
