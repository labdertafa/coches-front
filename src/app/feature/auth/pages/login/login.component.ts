import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthLoginRequestDto } from 'src/app/core/models/authLoginRequestDto';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseCamponent';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AppBaseComponent {
  // Formulario reactivo de login
  public loginForm : FormGroup;

  constructor(private router: Router, private authService: AuthService, private tokenService: TokenService) {
    super();
    this.loginForm = new FormGroup({
      email: new FormControl('email@ejemplo.com', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
    
  }

  public async signIn(): Promise<void> {
    let dtoLogin: AuthLoginRequestDto;

    if (this.loginForm.valid) {      
      let email = this.loginForm.get('email')?.value;
      let password = this.loginForm.get('password')?.value;
      dtoLogin = {
        "email": email,
        "password": password
      };
      console.log(dtoLogin);
      
      await lastValueFrom(this.authService.signIn(dtoLogin));

      console.log(this.tokenService.getToken());

      this.router.navigateByUrl("/portafolio");

      /*
      this.authService.signIn(dtoLogin).subscribe(value => {
        console.log(value);
      }); */
    
    } else {
      alert("Incorrecto");
    }
  }

  /*
  public goToSignUP() : void {
    this.router.navigateByUrl("/autenticacion/registro");
  } */

  public getErrorsForm(field: string): string {
    let message: string;

    message = '';
    if (this.isTouchedField(this.loginForm, field)) {
      if (this.loginForm.get(field)?.hasError('required')) {
        message = 'El campo es requerido';
      } else if (this.loginForm.get(field)?.hasError('email')) {
        message = 'El formato inválido';
      }
    }

    return message;
  }
}
