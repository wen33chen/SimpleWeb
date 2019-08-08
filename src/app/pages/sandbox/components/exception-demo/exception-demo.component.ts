import { Component, OnInit } from '@angular/core';
import { ExceptionService } from 'app/pages/sandbox/services/exception.service';


@Component({
  selector: 'app-exception-demo',
  templateUrl: './exception-demo.component.html',
  styleUrls: ['./exception-demo.component.scss']
})
export class ExceptionDemoComponent implements OnInit {

  keyword1: number;
  keyword2: number;
  keyword3: string;
  featureName1: string = '';
  featureName2: string = '';
  featureName3: string = '';

  constructor(
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {

  }

  handleClick1() {
    this.exceptionService.getException1(this.keyword1)
      .subscribe(resp => {
        this.featureName1 = resp.featureName;
      });
  }

  handleClick2() {
    this.exceptionService.getException2(this.keyword2)
    .subscribe(resp => {
      this.featureName2 = resp.featureName;
    });
  }

  handleClick3() {
    this.exceptionService.postException3(this.keyword3)
    .subscribe(resp => {
      this.featureName3 = resp.featureName;
    });
  }
}
