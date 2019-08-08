import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: { featureCode: '30001' }
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    data: { featureCode: '30003' }
  },
  {
    path: 'create',
    component: CreateComponent,
    data: { featureCode: '30002' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleListRoutingModule {}
