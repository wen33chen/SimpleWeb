import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedPrimengModule } from 'app/shared-primeng/shared-primeng.module';
import { SharedModule } from 'app/shared/shared.module';
import {KeyFilterModule} from 'primeng/keyfilter';
import { CalendarDemoComponent } from './components/calendar-demo/calendar-demo.component';
import { SelectCityDemoComponent } from './components/select-city-demo/select-city-demo.component';
import { UploadDemoComponent } from './components/upload-demo/upload-demo.component';
import { SandboxRoutingModule } from './sandbox-routing.module';
import { CheckboxgroupComponent } from './components/checkboxgroup/checkboxgroup.component';
import { FormvalidationComponent } from './components/formvalidation/formvalidation.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ExceptionDemoComponent } from './components/exception-demo/exception-demo.component';
import { FusingMechanismDemoComponent } from './components/fusing-mechanism-demo/fusing-mechanism-demo.component';

@NgModule({
  imports: [
    CommonModule,
    SandboxRoutingModule,
    SharedModule,
    SharedPrimengModule,
    KeyFilterModule,
    RadioButtonModule
  ],
  declarations: [
    CalendarDemoComponent,
    SelectCityDemoComponent,
    UploadDemoComponent,
    FormvalidationComponent,
    CheckboxgroupComponent,
    ExceptionDemoComponent,
    FusingMechanismDemoComponent,
  ]
})
export class SandboxModule {}
