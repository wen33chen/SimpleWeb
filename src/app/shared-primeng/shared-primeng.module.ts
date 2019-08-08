import { NgModule } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import {
  AutoCompleteModule,
  BreadcrumbModule,
  ButtonModule,
  CalendarModule,
  CheckboxModule,
  ConfirmDialogModule,
  DropdownModule,
  InputTextModule,
  MenubarModule,
  PanelMenuModule,
  SidebarModule,
  FieldsetModule,
  MultiSelectModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@NgModule({
  exports: [
    MenubarModule,
    SidebarModule,
    PanelMenuModule,
    BreadcrumbModule,
    InputTextModule,
    DropdownModule,
    AutoCompleteModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    FileUploadModule,
    CalendarModule,
    FieldsetModule,
    MultiSelectModule
  ]
})
export class SharedPrimengModule {}
