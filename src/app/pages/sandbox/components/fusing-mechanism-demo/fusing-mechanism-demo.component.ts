import { Component, OnInit } from '@angular/core';
import { ExceptionService } from 'app/pages/sandbox/services/exception.service';

@Component({
  selector: 'app-fusing-mechanism-demo',
  templateUrl: './fusing-mechanism-demo.component.html',
  styleUrls: ['./fusing-mechanism-demo.component.scss']
})
export class FusingMechanismDemoComponent implements OnInit {

  s : number;

  constructor(private exceptionService : ExceptionService) { }

  ngOnInit() {
    setInterval(() => {
      var dt = new Date();
      this.s = dt.getSeconds()
    }, 1000)
  }

  handleClick() {
    this.exceptionService
      .getFusingMechanism()
      .subscribe();
  }

}
