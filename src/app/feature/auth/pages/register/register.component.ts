import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { RegisterRequesDto } from 'src/app/core/models/registerRequestDto';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseCamponent';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends AppBaseComponent {
  public registerForm: FormGroup;
  public passwordGenerated: string;
  public registered: boolean;

  constructor(private router: Router, private authService: AuthService) {
    super();
    this.passwordGenerated = "";
    this.registered = false;
    
    this.registerForm = new FormGroup({
      cardId: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      cellphoneNumber: new FormControl('', Validators.pattern("^[0-9]*$"))
    });
  } 

  public async register(): Promise<void> {
    let dtoRegister: RegisterRequesDto = this.registerForm.value;

    console.log("Formulario a guardar: ", this.registerForm.value);

    if (this.registerForm.valid) {
      await lastValueFrom(this.authService.register(dtoRegister)).then(resp => {
        this.passwordGenerated = resp.password;
      });

      this.registered = true;
    } else {
      alert("Error en el formulario!")
    }
  }

  public getErrorsForm(field: string): string {
    let message: string;

    message = '';
    if (this.isTouchedField(this.registerForm, field)) {
      if (this.registerForm.get(field)?.hasError('required')) {
        message = 'El campo es requerido';
      } else if (this.registerForm.get(field)?.hasError('email')) {
        message = 'El formato de email inválido';
      } else if (this.registerForm.get(field)?.hasError('pattern')) {
        message = 'El formato de campo inválido';
      }
    }

    return message;
  }
}
