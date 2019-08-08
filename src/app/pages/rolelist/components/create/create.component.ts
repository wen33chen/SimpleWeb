import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NotifySeverity } from 'app/core/enums/notify-severity.enum';
import { NotifyService } from 'app/core/services/notify.service';
import { TranslateService } from '@ngx-translate/core';
import { RoleClient, RoleCreate } from 'app/shared/swagger-gen';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  model = new FormGroup({
    roleCode: new FormControl(null, Validators.required),
    roleName: new FormControl(null, Validators.required),
    isActive: new FormControl(true, Validators.required)
  });

  constructor(
    private router: Router,
    private roleClient: RoleClient,
    private notifyService: NotifyService,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  save() {
    const generalLang = this.translate.instant('general');
    this.roleClient
      .createRole(RoleCreate.fromJS(this.model.value))
      .subscribe(_ => {
        this.router.navigate(['/rolelist']);
        this.notifyService.notify(
          NotifySeverity.success,
          generalLang['success'],
          generalLang['successCreate']
        );
      });
  }

  cancel() {
    this.router.navigate(['/rolelist']);
  }
}
