import { Component } from '@angular/core';
import { CarDto } from 'src/app/core/models/carDto';
import { PurchaseDetailDto } from 'src/app/core/models/purchaseDetailDto';
import { CarService } from 'src/app/core/services/car.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  public listCarsPortfolio!: CarDto[];
  public purchaseDetails: PurchaseDetailDto[];

  constructor(private carService: CarService) {
    this.purchaseDetails = JSON.parse(<string>localStorage.getItem("purchaseDetails"));
    if (this.purchaseDetails == null) {
      this.purchaseDetails = [];
    }
    this.carService.getAllCars().subscribe({
      next: value => {
        this.listCarsPortfolio = value;
      }
    });
  }

  public addCarShoppingCart(carToAdd: CarDto): void {
    let added: boolean = false;

    this.purchaseDetails.forEach(car => {
      if (car.carId == carToAdd.id) {
        added = true;
        if (car.quantity + 1 > carToAdd.stock) {
          Swal.fire({
            icon: "error",
            title: "Error al agregar",
            text: "No hay suficiente stock del carro seleccionado"
          });
          return;
        } else {
          car.quantity += 1;
          car.total += carToAdd.price;
        }
      }
    });

    if (!added) {
      let purchaseDetail: PurchaseDetailDto = {
          carId: carToAdd.id,
          quantity: 1,
          total: carToAdd.price
      };
      this.purchaseDetails.push(purchaseDetail);
    }

    console.log("Carro agregado!");
    localStorage.setItem('purchaseDetails', JSON.stringify(this.purchaseDetails));
    this.carService.setNumberProducts();
  }

  public deleteCarShoppingCart(carToDelete: CarDto): void {
    let carActual = this.purchaseDetails.find(car => car.carId == carToDelete.id);
    let deleted: boolean = false;

    if (carActual == null) {
      Swal.fire({
        icon: "info",
        title: "Error al eliminar",
        text: "No has agregado ninguna unidad de este carro"
      });
      return;
    } else {
      for (let i: number = 0; i < this.purchaseDetails.length && !deleted; i++) {
        let car: PurchaseDetailDto = this.purchaseDetails[i];
        if (car.carId == carToDelete.id) {
          deleted = true;
          if (car.quantity - 1 == 0) {
            this.purchaseDetails.splice(i, 1);
          } else {
            car.quantity -= 1;
            car.total -= carToDelete.price;
          }
        }
      }
    }
    console.log("Carro eliminado!");
    localStorage.setItem('purchaseDetails', JSON.stringify(this.purchaseDetails));
    this.carService.setNumberProducts();
  }
}