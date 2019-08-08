import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifySeverity } from 'app/core/enums/notify-severity.enum';
import { NotifyService } from 'app/core/services/notify.service';
import { switchMap, tap } from 'rxjs/operators';

import { RolefeatureService } from '../../services/rolefeature.service';
import { FeatureService } from 'app/pages/feature/services/feature.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  model = this.rolefeatureService.createRoleModel();
  features$ = this.rolefeatureService.getFeatures();
  roleName: string;

  get roleId() {
    return this.model.get('roleId').value;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rolefeatureService: RolefeatureService,
    private notifyService: NotifyService,
    private translate: TranslateService,
    private featureService: FeatureService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(param => this.rolefeatureService.getRolesById(param['id'])),
        tap(FeaturegroupData => {
          this.roleName = FeaturegroupData.roleName;
          this.model.reset(FeaturegroupData);
        })
      )
      .subscribe();
  }

  save() {
    const generalLang = this.translate.instant('general');

    this.rolefeatureService
      .updateRole(this.model.value)
      .pipe(switchMap(_ => this.featureService.getFeaturesByRoleId()))
      .subscribe(_ => {
        this.notifyService.notify(
          NotifySeverity.success,
          generalLang['success'],
          generalLang['successUpdate']
        );
      });
  }

  cancel() {
    this.router.navigate(['/rolefeature']);
  }
}
