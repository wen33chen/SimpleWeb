import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { cities as cityList } from './places';

export const CITY_SELECTOR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CitySelectorComponent),
  multi: true
};

@Component({
  selector: 'app-city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.scss'],
  providers: [CITY_SELECTOR_VALUE_ACCESSOR]
})
export class CitySelectorComponent implements OnInit, ControlValueAccessor {
  cities: SelectItem[] = [];
  district: SelectItem[] = [];

  selectedCity: any = null;
  selectedDistrict: any;

  disabled = false;

  private _value: any;

  set value(value: any) {
    this._value = value;
    this.notifyValueChange();
  }

  get value(): any {
    return this._value;
  }

  onChange: (value) => {};
  onTouched: () => {};

  constructor() {}

  notifyValueChange(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  ngOnInit(): void {
    this.cities = cityList.map(city => ({
      label: city.key,
      value: city
    }));
  }

  writeValue(input: string): void {
    this.value = input;
    if (input) {
      this._setSelectedCityAndDistrict(input);
    }
  }

  private _setSelectedCityAndDistrict(input) {
    const distSplit = input.split(' ');
    if (distSplit.length === 3) {
      const compareSelectItemByName = (name: string) => (city: SelectItem) =>
        city.label === name;

      const compareToCity = compareSelectItemByName(distSplit[0]);
      this.selectedCity = this.cities.find(compareToCity).value;
      this._setDistData();

      const distName = `${distSplit[1]} ${distSplit[2]}`;
      const compareToDist = compareSelectItemByName(distName);
      this.selectedDistrict = this.district.find(compareToDist).value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private _setDistData() {
    this.district = [
      ...this.selectedCity.value.map(dist => ({ label: dist, value: dist }))
    ];
    this.selectedDistrict = this.district[0].value;
  }

  handleCityChange() {
    this._setDistData();
    this.handleDistChange();
  }

  handleDistChange() {
    this.value = `${this.selectedCity.key} ${this.selectedDistrict}`;
  }
}
