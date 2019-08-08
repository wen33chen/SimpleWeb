import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FeatureService } from 'app/pages/feature/services/feature.service';
import { NotifyService } from 'app/core/services/notify.service';
import { NotifySeverity } from 'app/core/enums/notify-severity.enum';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  model = new FormGroup({
    featureId: new FormControl(null, Validators.required),
    featureCode: new FormControl(null, Validators.required),
    featureOldName: new FormControl(null, Validators.required),
    featureName: new FormControl(null, Validators.required),
    isActive: new FormControl(true, Validators.required),
    isAllowAssignRoleUse: new FormControl(false, Validators.required),
    featureGroupId: new FormControl(null, Validators.required),
    sort: new FormControl(null, Validators.required)
  });

  featureGroupSelectList$ = this.featureService.getFeatureGroupList();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private featureService: FeatureService,
    private notifyService: NotifyService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(param => this.featureService.getFeature(param['id'])),
        tap(featureData => {
          featureData.featureGroupId = { id: featureData.featureGroupId };
          this.model.reset(featureData);
          this.model.get('featureOldName').setValue(featureData.featureName);
          this.model.get('featureName').setValue(featureData.featureName);
        })
      )
      .subscribe();
  }

  save() {
    const generalLang = this.translate.instant('general');
    this.featureService.updateFeature(this.model.value).subscribe(_ => {
      this.model
        .get('featureOldName')
        .setValue(this.model.get('featureName').value);
      this.notifyService.notify(
        NotifySeverity.success,
        generalLang['success'],
        generalLang['successUpdate']
      );
    });
  }

  cancel() {
    this.router.navigate(['/feature']);
  }
}
