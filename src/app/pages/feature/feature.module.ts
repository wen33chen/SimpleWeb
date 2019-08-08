import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedPrimengModule } from 'app/shared-primeng/shared-primeng.module';
import { SharedModule } from 'app/shared/shared.module';

import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { MainComponent } from './components/main/main.component';
import { FeatureRoutingModule } from './feature-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FeatureRoutingModule,
    SharedModule,
    SharedPrimengModule
  ],
  declarations: [MainComponent, CreateComponent, EditComponent]
})
export class FeatureModule {}
