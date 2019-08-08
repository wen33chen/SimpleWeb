import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarDemoComponent } from 'app/pages/sandbox/components/calendar-demo/calendar-demo.component';

import { SelectCityDemoComponent } from './components/select-city-demo/select-city-demo.component';
import { UploadDemoComponent } from './components/upload-demo/upload-demo.component';
import { CheckboxgroupComponent } from './components/checkboxgroup/checkboxgroup.component';
import { FormvalidationComponent } from './components/formvalidation/formvalidation.component';
import { ExceptionDemoComponent } from './components/exception-demo/exception-demo.component';
import { FusingMechanismDemoComponent } from './components/fusing-mechanism-demo/fusing-mechanism-demo.component';


const routes: Routes = [
  {
    path: 'exception-demo',
    component: ExceptionDemoComponent
  },
  {
    path: 'fusing-mechanism-demo',
    component: FusingMechanismDemoComponent
  },
  {
    path: 'calendar-demo',
    component: CalendarDemoComponent
  },
  {
    path: 'select-city-demo',
    component: SelectCityDemoComponent
  },
  {
    path: 'upload-demo',
    component: UploadDemoComponent
  },
  {
    path: 'checkboxgroup',
    component: CheckboxgroupComponent
  },
  {
    path: 'formvalidation',
    component: FormvalidationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandboxRoutingModule {}
