import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-formvalidation',
  templateUrl: './formvalidation.component.html',
  styleUrls: ['./formvalidation.component.scss']
})
export class FormvalidationComponent implements OnInit {

  constructor(private _fb: FormBuilder) { }

  colors: Array<string> = ['green', 'blue', 'red', 'gray'];
  selectedcolors = [];
  testFrom: FormGroup;
  states: any;
  countries: any;
  noSpecial: RegExp = /^[A-Za-z]+$/;
  checkboxinvaild: boolean;
  ngOnInit() {
    this.countries = [{id: 'USA', name: '有下層'}, {id: 'UK', name: '無下層'}, {id: 'FR', name: '無下層'}];
    this.states = [{ id: 'AL', name: '上層連動' }, { id: 'AK', name: '上層連動' }, { id: 'AZ', name: '上層連動' }];
    this.checkboxinvaild = true;
    this.testFrom = this._fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+_]+@[a-z0-9.-]+'),
        ]
      ],
      lastname: [
        '',
        [
          Validators.required,
        ]
      ],
      count: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(2),
        ]
      ],
      shirt: [
        '',
        [
          Validators.required,
        ]
      ],
      state: [
        '',
        [
          Validators.required,
        ]
      ],
      country: [
        '',
        [
          Validators.required,
        ]
      ],
      favcolor: this.addColorGroup(),
    });

    this.changeCuontry();
    this.testFrom.get('favcolor').clearValidators();
    this.testFrom.get('state').disable();
  }

  addColorGroup() {
    const arr = this.colors.map(element => {
      return this._fb.control(false);
    });
    return this._fb.array(arr);
  }

  getSelectedColorsValue() {
    this.selectedcolors = [];
    this.colorsArray.controls.forEach((item, i) => {
      if (this.colors[i] === item.value[0]) {
        this.selectedcolors.push(this.colors[i]);
      }
    });
    if (this.selectedcolors.length === 0) {
      this.checkboxinvaild = true;
    } else {
       if (this.testFrom.invalid) {
        this.checkboxinvaild = true;
       } else {
        this.checkboxinvaild = false;
       }
    }
  }

  get colorsArray() {
    return <FormArray>this.testFrom.get('favcolor');
  }

  checkcountValue() {
    console.log(this.count.value);
  }

changeCuontry() {
  this.testFrom.get('country').valueChanges
  .subscribe(selectedCountry => {
      if (selectedCountry.id !== 'USA') {
          this.testFrom.get('state').reset();
          this.testFrom.get('state').disable();
          this.testFrom.get('state').setValidators(Validators.requiredTrue);
      } else {
          this.testFrom.get('state').enable();
          this.testFrom.get('state').setValidators(Validators.required);
      }
  });

}

  get email() { return this.testFrom.get('email'); }

  get lastname() { return this.testFrom.get('lastname'); }

  get count() { return this.testFrom.get('count'); }

  get shirt() { return this.testFrom.get('shirt'); }

  get statess() { return this.states; }

  get countriess() { return this.countries; }

}
