import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedPrimengModule } from '../shared-primeng/shared-primeng.module';
import { CitySelectorComponent } from './components/city-selector/city-selector.component';
import { FeatureAuthDirective } from './directives/feature-auth.directive';
import { ActiveTextDirective } from './directives/active-text.directive';
import { RoleClient } from './swagger-gen';

@NgModule({
  imports: [CommonModule, FormsModule, SharedPrimengModule, TranslateModule],
  declarations: [
    CitySelectorComponent,
    FeatureAuthDirective,
    ActiveTextDirective
  ],
  exports: [
    CitySelectorComponent,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    FeatureAuthDirective,
    ActiveTextDirective
  ],
  providers: [RoleClient]
})
export class SharedModule {}
