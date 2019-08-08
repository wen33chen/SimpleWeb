import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FusingMechanismDemoComponent } from './fusing-mechanism-demo.component';

describe('FusingMechanismDemoComponent', () => {
  let component: FusingMechanismDemoComponent;
  let fixture: ComponentFixture<FusingMechanismDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FusingMechanismDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FusingMechanismDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
