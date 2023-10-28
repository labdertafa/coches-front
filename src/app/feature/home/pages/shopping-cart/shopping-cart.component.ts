import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PurchaseDetailDto } from 'src/app/core/models/purchaseDetailDto';
import { PurchaseRequestDto } from 'src/app/core/models/purchaseRequestDto';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  public purchaseDetailsList: Array<PurchaseDetailDto>;
  public billNumber: number = 0 ;

  constructor(private tokenService: TokenService, private purchaseService: PurchaseService) {
    this.purchaseDetailsList = JSON.parse(<string>localStorage.getItem("purchaseDetails"));
  }

  public registerPurchase(): void {
    let totalItems: number = 0;

    this.purchaseDetailsList.forEach(car => totalItems += car.total);

    let newPurchase: PurchaseRequestDto = {
      cardIdCustomer: this.tokenService.getInfoToken().cardId,
      billDate: new Date(Date.now()),
      total: totalItems,
      paymentMethod: "Crédito",
      purchaseDetailList: this.purchaseDetailsList
    };

    this.purchaseService.registerPurchase(newPurchase).subscribe({
      next: value => {
        this.billNumber = value.billNumber;
      }
    });

    localStorage.clear();
  }
}