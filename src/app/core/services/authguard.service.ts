import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

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
      this.router.navigateByUrl("/authenticacion/inicio-sesion");
      return false;
    }
    return true;
  }
}
