import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { BrandCarDto } from 'src/app/core/models/brandCarDto';
import { BrandCarService } from 'src/app/core/services/brand-car.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseCamponent';

@Component({
  selector: 'app-info-basic-car',
  templateUrl: './info-basic-car.component.html',
  styleUrls: ['./info-basic-car.component.css']
})
export class InfoBasicCarComponent extends AppBaseComponent implements OnInit {
  public infoBasicForm: any;
  public listBrandCar!: BrandCarDto[];

  constructor(private controlContainer: ControlContainer, private brandCarService: BrandCarService) {
    super();
    this.brandCarService.getAllBrandsCar().subscribe({
      next: value => {this.listBrandCar = value}
    });
  }

  ngOnInit(): void {
    this.infoBasicForm = this.controlContainer.control;
    this.infoBasicForm = this.infoBasicForm.controls["infoBasicForm"];
  }

  public getErrorsForm(field: string): string {
    let message: string;

    message = '';
    if (this.isTouchedField(this.infoBasicForm, field)) {
      if (this.infoBasicForm.get(field)?.hasError('required')) {
        message = 'El campo es requerido';
      } else if (this.infoBasicForm.get(field)?.hasError('numberDateFuture')) {
        message = 'El año es inválido';
      }
    }

    return message;
  }
}