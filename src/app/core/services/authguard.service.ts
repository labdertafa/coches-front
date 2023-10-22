import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { Rol } from '../enums/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private tokenService: TokenService, private router: Router) { }

  public canActiveWithAuth(): boolean {
    if (this.tokenService.getToken()) {
      this.router.navigateByUrl("/portafolio");
      return false;
    }
    return true;
  }

  public canActiveWithoutAuth(): boolean {
    if (!this.tokenService.getToken()) {
      alert("No tiene permisos");
      this.router.navigateByUrl("/authenticacion/inicio-sesion");
      return false;
    }
    return true;
  }

  public canActiveWithAdminRol(): boolean {
    if (this.tokenService.getInfoToken().rol != Rol.ADMIN && !this.canActiveWithAuth()) {
      alert("No tiene permisos");
      this.router.navigateByUrl("/authenticacion/inicio-sesion");
      return false;
    }
    return true;
  }
}