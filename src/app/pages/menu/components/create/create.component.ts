import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureService } from 'app/pages/feature/services/feature.service';
import { NotifyService } from 'app/core/services/notify.service';
import { NotifySeverity } from 'app/core/enums/notify-severity.enum';
import { MenuService } from 'app/pages/menu/services/menu.service';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  constructor(
    private router: Router,
    private featureService: FeatureService,
    private notifyService: NotifyService,
    private translate: TranslateService,
    private menuService: MenuService
  ) { }

  model = this.menuService.createMenuModel();

  lastMenuId = 0;
  parentName = '';

  featureSelectList$: Observable<SelectItem[]>;

  ngOnInit() {
    const ddlLang = this.translate.instant('drowdownlistdefault');
    this.model.get('menuId').clearValidators();
    this.model.get('parentId').clearValidators();
    this.model.get('featureId').clearValidators();
    this.model.get('active').setValue(true);

    this.featureSelectList$ = this.featureService
      .getFeatureOptions()
      .pipe(
        map(options =>
          [
            { text: <string>ddlLang['noBindToFeature'], id: <number>null },
            ...options
          ].map(x => ({
            label: x.text,
            value: x.id
          }))
        )
      );

    this.model.get('parentId').setValue(this.getLastMenuId());
    this.model
      .get('featureId')
      .setValue(this.getLastMenu().featureId);
    this.lastMenuId = this.getLastMenuId();

    this.setParentName();
  }

  save() {
    const generalLang = this.translate.instant('general');
    this.menuService.createMenu(this.model.value).subscribe(_ => {
      this.router.navigate(['/menu/list', this.getLastMenuId()]);
      this.notifyService.notify(
        NotifySeverity.success,
        generalLang['success'],
        generalLang['successCreate']
      );
    });
  }

  cancel() {
    this.router.navigate(['/menu/list', this.getLastMenuId()]);
  }

  getLastMenu() {
    return this.menuService.menuPathData[
      this.menuService.menuPathData.length - 1
    ];
  }

  getLastMenuId() {
    return this.getLastMenu().menuId;
  }

  setParentName() {
    if (this.lastMenuId !== 0) {
      this.menuService.getMenu(this.lastMenuId)
      .subscribe(menuData => {
        this.parentName = menuData.text;
      });
    }
  }

}
