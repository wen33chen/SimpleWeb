import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifySeverity } from 'app/core/enums/notify-severity.enum';
import { NotifyService } from 'app/core/services/notify.service';
import { RoleClient, RoleEdit } from 'app/shared/swagger-gen';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  model = new FormGroup({
    roleId: new FormControl(0, Validators.required),
    roleOldCode: new FormControl(null, Validators.required),
    roleCode: new FormControl(null, Validators.required),
    roleName: new FormControl(null, Validators.required),
    isActive: new FormControl(false, Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleClient: RoleClient,
    private notifyService: NotifyService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(param => this.roleClient.getRoleById(param['id'])),
        tap(result => {
          this.model.reset(result.data);
          this.model.get('roleOldCode').setValue(result.data.roleCode);
          this.model.get('roleCode').setValue(result.data.roleCode);
          this.model.get('roleName').setValue(result.data.roleName);
        })
      )
      .subscribe();
  }

  save() {
    const generalLang = this.translate.instant('general');
    this.roleClient
      .updateRole(RoleEdit.fromJS(this.model.value))
      .subscribe(_ => {
        this.model
          .get('roleOldCode')
          .setValue(this.model.get('roleCode').value);
        this.notifyService.notify(
          NotifySeverity.success,
          generalLang['success'],
          generalLang['successUpdate']
        );
      });
  }

  cancel() {
    this.router.navigate(['/rolelist']);
  }
}
