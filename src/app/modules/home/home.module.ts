import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared/shared.module';
import { NbAlertModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbRadioModule, NbSelectModule, NbTableModule, NbTimepickerModule, NbToggleModule, NbUserModule } from '@nebular/theme';
import { HeaderComponent } from '../header/header.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ResourceInfoComponent } from '../resource-info/resource-info.component';
import { SceduleComponent } from '../scedule/scedule.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { userReducer } from '../shared/store/reducer';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{ path: '', component: HomeComponent }];
@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    ResourceInfoComponent,
    SceduleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NbToggleModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbEvaIconsModule,
    NbIconModule,
    NbButtonModule,
    NbToggleModule,
    NbCardModule,
    NbUserModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbTableModule,
    FormsModule,
    NbTimepickerModule,
    TranslateModule,
    StoreModule.forFeature('resource',userReducer),
    RouterModule.forChild(routes),
    NbAlertModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
