import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RegisterCarComponent } from './pages/register-car/register-car.component';
import { InfoBasicCarComponent } from './components/info-basic-car/info-basic-car.component';
import { InfoTechCarComponent } from './components/info-tech-car/info-tech-car.component';
import { InfoEsteticCarComponent } from './components/info-estetic-car/info-estetic-car.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterCarComponent,
    InfoBasicCarComponent,
    InfoTechCarComponent,
    InfoEsteticCarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
