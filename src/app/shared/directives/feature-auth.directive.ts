import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  HostBinding
} from '@angular/core';
import { from, combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { FeatureService } from 'app/pages/feature/services/feature.service';
@Directive({
  selector: '[appFeatureAuth]'
})
export class FeatureAuthDirective implements OnInit {
  @HostBinding('disabled')
  disabled: boolean;

  @Input() featureCode: string;

  constructor(private featureService: FeatureService) {}

  ngOnInit(): any {
    this.featureService.roleFeatureCodes$
      .pipe(
        map(codes => codes.includes(this.featureCode)),
        tap(isPermission => (this.disabled = !isPermission))
      )
      .subscribe();
  }
}
