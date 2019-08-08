import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-checkboxgroup',
  templateUrl: './checkboxgroup.component.html',
  styleUrls: ['./checkboxgroup.component.scss']
})
export class CheckboxgroupComponent implements OnInit {

  colors: Array<string> = ['green', 'blue', 'red', 'gray'];
  selectedcolors = [];
  constructor(private _fb: FormBuilder) { }
  testFrom: FormGroup;
  ngOnInit() {
    this.testFrom = this._fb.group({
      All: new FormControl(''),
      favcolor: this.addColorGroup(),
    });
  }

  addColorGroup() {
    const arr = this.colors.map(element => {
      return this._fb.control(false);
    });
    return this._fb.array(arr);
  }

  get colorsArray() {
    return <FormArray>this.testFrom.get('favcolor');
  }

  get All() {
    return this.testFrom.get('All');
  }

  getSelectedColorsValue() {
    this.selectedcolors = [];
    this.colorsArray.controls.forEach((item, i) => {
      if (this.colors[i] === item.value[0]) {
        this.selectedcolors.push(this.colors[i]);
      }
    });
    if (this.selectedcolors.length < 4) {
      this.All.setValue(undefined);
    }
  }

  getSelectedAllColors() {
    if (this.All.value[0] === 'All') {
      this.colorsArray.controls.forEach((item, i) => {
        item.setValue([this.colors[i]]);
      });
    } else {
      this.colorsArray.controls.forEach((item, i) => {
        item.setValue(false);
      });
    }
    this.getSelectedColorsValue();
  }
}
