import { PurchaseDetailDto } from "./purchaseDetailDto";

export interface PurchaseRequestDto {
    billNumber?: number;
    cardIdCustomer: string;
    billDate: Date;
    total: number;
    paymentMethod: string;
    purchaseDetailList: Array<PurchaseDetailDto>;
}