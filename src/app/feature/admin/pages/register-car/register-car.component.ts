import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarDto } from 'src/app/core/models/carDto';
import { CarService } from 'src/app/core/services/car.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseCamponent';
import { CustomValidators } from 'src/app/core/utils/CustomValidators';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrls: ['./register-car.component.css']
})

export class RegisterCarComponent extends AppBaseComponent {
  public registerCarForm: FormGroup;

  constructor(private fb: FormBuilder, private carService: CarService) {
    super();
    this.registerCarForm = new FormGroup({
//    this.registerCarForm = this.fb.group({
      infoBasicForm: this.fb.group({
        brandCarId: ['', Validators.required],
        reference: ['', Validators.required],
        price: ['', Validators.required],
        modelYear: ['', [Validators.required], CustomValidators.numberDateFuture],
        category: ['', Validators.required],
        stock: ['', Validators.required]
      }),
      infoTechForm: this.fb.group({
        horsepower: ['', Validators.required],
        engine: ['', Validators.required],
        transmission: ['', Validators.required],
        fuelType: ['', Validators.required],
        traction: ['', Validators.required],
        steering: ['', Validators.required]
      }),
      infoEsteticForm: this.fb.group({
        color: ['', Validators.required],
        numberDoor: ['', Validators.required],
        numberSeat: ['', Validators.required],
        imagePath: ['', Validators.required]
      })
    });
  }

  public async registerCar(): Promise<void> {
    if (!this.registerCarForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hay errores en el formulario, revíselo por favor'
      });
      this.registerCarForm.markAllAsTouched();
      return;
    }

    let formData = this.registerCarForm.value;
    
    let formBasic = formData["infoBasicForm"];
    let formTech = formData["infoTechForm"];
    let formEstetic = formData["infoEsteticForm"];

    let dtoRegisterCar: CarDto = {
      ...formBasic,
      ...formTech,
      ...formEstetic
    };

    console.log(dtoRegisterCar);

    this.carService.registerCar(dtoRegisterCar).subscribe({
      next: value => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Se registró el coche correctamente'
        });
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Algo ha ocurido',
          text: 'Hubo errores al guardar los datos del coche'
        });
      }
    });
  }

  public getErrorsForm(field: string): string {
    let message: string;

    message = '';
    if (this.isTouchedField(this.registerCarForm, field)) {
      if (this.registerCarForm.get(field)?.hasError('required')) {
        message = 'El campo es requerido';
      } else if (this.registerCarForm.get(field)?.hasError('numberDateFuture')) {
        message = 'El año es inválido';
      }
    }

    return message;
  }
}
