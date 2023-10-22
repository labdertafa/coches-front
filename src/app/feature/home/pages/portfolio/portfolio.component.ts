import { Component } from '@angular/core';
import { CarDto } from 'src/app/core/models/carDto';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  public listCarsPortfolio!: CarDto[];

  constructor(private carService: CarService) {
    this.carService.getAllCars().subscribe({
      next: value => {
        this.listCarsPortfolio = value;
      }
    });
  }
}
