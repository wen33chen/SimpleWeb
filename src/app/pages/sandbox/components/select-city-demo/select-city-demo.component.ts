import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-city-demo',
  templateUrl: './select-city-demo.component.html',
  styleUrls: ['./select-city-demo.component.scss']
})
export class SelectCityDemoComponent implements OnInit {
  city = '台北市 106 大安';
  disabled = false;
  constructor() {}

  ngOnInit() {}
}
