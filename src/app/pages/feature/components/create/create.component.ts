import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FeatureService } from 'app/pages/feature/services/feature.service';
import { NotifyService } from 'app/core/services/notify.service';
import { NotifySeverity } from 'app/core/enums/notify-severity.enum';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  model = new FormGroup({
    featureCode: new FormControl(null, Validators.required),
    featureName: new FormControl(null, Validators.required),
    isActive: new FormControl(true, Validators.required),
    isAllowAssignRoleUse: new FormControl(false, Validators.required),
    featureGroupId: new FormControl(null, Validators.required),
    sort: new FormControl(null, Validators.required)
  });

  featureGroupSelectList$ = this.featureService.getFeatureGroupList();

  constructor(
    private router: Router,
    private featureService: FeatureService,
    private notifyService: NotifyService,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  save() {
    const generalLang = this.translate.instant('general');
    this.featureService.createFeature(this.model.value).subscribe(_ => {
      this.router.navigate(['/feature']);
      this.notifyService.notify(
        NotifySeverity.success,
        generalLang['success'],
        generalLang['successCreate']
      );
    });
  }

  cancel() {
    this.router.navigate(['/feature']);
  }
}
