import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NotifySeverity } from 'app/core/enums/notify-severity.enum';
import { NotifyService } from 'app/core/services/notify.service';
import { FeaturegroupService } from 'app/pages/featuregroup/services/featuregroup.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  model = new FormGroup({
    featureGroupName: new FormControl(null, Validators.required),
    isActive: new FormControl(true, Validators.required),
    sort: new FormControl(true, Validators.required)
  });

  constructor(
    private router: Router,
    private featuregroupService: FeaturegroupService,
    private notifyService: NotifyService,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  save() {
    const generalLang = this.translate.instant('general');
    this.featuregroupService
      .createFeatureGroup(this.model.value)
      .subscribe(_ => {
        this.router.navigate(['/featuregroup']);
        this.notifyService.notify(
          NotifySeverity.success,
          generalLang['success'],
          generalLang['successCreate']
        );
      });
  }

  cancel() {
    this.router.navigate(['/featuregroup']);
  }
}
