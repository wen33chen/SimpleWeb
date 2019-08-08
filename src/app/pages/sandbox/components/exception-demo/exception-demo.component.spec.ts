import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionDemoComponent } from './exception-demo.component';

describe('ExceptionDemoComponent', () => {
  let component: ExceptionDemoComponent;
  let fixture: ComponentFixture<ExceptionDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceptionDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceptionDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
