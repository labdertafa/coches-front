import { Component } from '@angular/core';
import { PurchaseDetailDto } from 'src/app/core/models/purchaseDetailDto';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent {
  public purchasesHistory: Array<any> = [];
  public purchaseDetailsList: Array<PurchaseDetailDto> = [];

  constructor(private purchaseService: PurchaseService, private tokenService: TokenService) {
    this.purchaseService.getAllPurchasesByIdCustomer(this.tokenService.getInfoToken().cardId).subscribe({
      next: value => {
        this.purchasesHistory = value;
      }
    });
  }

  public showPurchasedCarList(purchaseDetails: Array<PurchaseDetailDto>): void {
    console.log(purchaseDetails);
    this.purchaseDetailsList = purchaseDetails;
  }
}