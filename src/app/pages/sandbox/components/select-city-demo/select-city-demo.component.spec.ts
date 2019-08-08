import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCityDemoComponent } from './select-city-demo.component';

describe('SelectCityDemoComponent', () => {
  let component: SelectCityDemoComponent;
  let fixture: ComponentFixture<SelectCityDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCityDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCityDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
