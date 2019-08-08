import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedPrimengModule } from 'app/shared-primeng/shared-primeng.module';
import { SharedModule } from 'app/shared/shared.module';

import { EditComponent } from './components/edit/edit.component';
import { MainComponent } from './components/main/main.component';
import { RolefeatureRoutingModule } from './rolefeature-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RolefeatureRoutingModule,
    SharedModule,
    SharedPrimengModule
  ],
  declarations: [MainComponent, EditComponent]
})
export class RolefeatureModule {}
