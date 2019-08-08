import { Directive, ElementRef, Input , OnInit} from '@angular/core';

@Directive({
  selector: '[appActiveText]'
})
export class ActiveTextDirective implements OnInit {

  constructor(private el: ElementRef) {}

  @Input() isActive: boolean;

  ngOnInit(): any {
    this.el.nativeElement.style.color = "#fff";
    this.el.nativeElement.style.width = "40px";
    this.el.nativeElement.style.height = "22px";
    this.el.nativeElement.style.textAlign = "center";
    this.el.nativeElement.style.fontFamily = "'Open Sans', 'Helvetica Neue', sans-serif";
    if(this.isActive) {
      this.el.nativeElement.style.backgroundColor = "#007bff"
      this.el.nativeElement.innerText = "啟用";
    } else {
      this.el.nativeElement.style.backgroundColor = "#dc3545"
      this.el.nativeElement.innerText = "停用";
    }
  }
}
