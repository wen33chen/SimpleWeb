import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FeaturegroupService } from 'app/pages/featuregroup/services/featuregroup.service';
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
    featureGroupId: new FormControl(0, Validators.required),
    featureGroupOldName: new FormControl(null, Validators.required),
    featureGroupName: new FormControl(null, Validators.required),
    isActive: new FormControl(false, Validators.required),
    sort: new FormControl(false, Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private featuregroupService: FeaturegroupService,
    private notifyService: NotifyService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(param =>
          this.featuregroupService.getFeatureGroup(param['id'])
        ),
        tap(featuregroupData => {
          this.model.reset(featuregroupData);
          this.model
            .get('featureGroupOldName')
            .setValue(featuregroupData.featureGroupName);
          this.model
            .get('featureGroupName')
            .setValue(featuregroupData.featureGroupName);
        })
      )
      .subscribe();
  }

  save() {
    const generalLang = this.translate.instant('general');
    this.featuregroupService
      .updateFeatureGroup(this.model.value)
      .subscribe(_ => {
        this.model
          .get('featureGroupOldName')
          .setValue(this.model.get('featureGroupName').value);

        this.notifyService.notify(
          NotifySeverity.success,
          generalLang['success'],
          generalLang['successUpdate']
        );
      });
  }

  cancel() {
    this.router.navigate(['/featuregroup']);
  }
}
