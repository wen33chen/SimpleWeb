import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { MainComponent } from './components/main/main.component';
import { SharedPrimengModule } from 'app/shared-primeng/shared-primeng.module';
import { SharedModule } from 'app/shared/shared.module';
import { CreateComponent } from './components/create/create.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedPrimengModule,
    MenuRoutingModule
  ],
  declarations: [MainComponent, CreateComponent]
})
export class MenuModule { }
