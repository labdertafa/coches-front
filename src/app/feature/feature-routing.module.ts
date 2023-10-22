import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from '../core/services/authguard.service';

const routes: Routes = [
  {
    path: "autenticacion",
    canActivate: [() => inject(AuthguardService).canActiveWithAuth()],
    loadChildren: () => import("./auth/auth.module").then(a => a.AuthModule)
  },
  {
    path: "portafolio",  
    canActivate: [() => inject(AuthguardService).canActiveWithoutAuth()],
    loadChildren: () => import("./home/home.module").then(a => a.HomeModule)
  },
  {
    path: "admin",
    canActivate: [() => inject(AuthguardService).canActiveWithAdminRol()],
    loadChildren: () => import("./admin/admin.module").then(a => a.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
