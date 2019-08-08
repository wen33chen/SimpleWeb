import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedPrimengModule } from 'app/shared-primeng/shared-primeng.module';

import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { MainComponent } from './components/main/main.component';
import { FeaturegroupRoutingModule } from './featuregroup-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FeaturegroupRoutingModule,
    SharedModule,
    SharedPrimengModule
  ],
  declarations: [MainComponent, EditComponent, CreateComponent]
})
export class FeaturegroupModule {}
