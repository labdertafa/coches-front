import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarService } from 'src/app/core/services/car.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent {
  public nameCustomer: string;
  public emailCustomer: string;
  public numberProducts: number = 0;
  public subscriptionNumber: Subscription;

  constructor(private tokenService: TokenService, private carSevice: CarService) {
    this.nameCustomer = this.tokenService.getInfoToken().fullname;
    this.emailCustomer = this.tokenService.getInfoToken().email;
    this.subscriptionNumber = this.carSevice.getNumberProducts().subscribe({
      next: value => this.numberProducts = value
    });
  }
}