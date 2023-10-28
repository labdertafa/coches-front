import { PurchaseDetailDto } from "./purchaseDetailDto";

export interface PurchaseRequestDto {
    cardIdCustomer: string;
    billDate: Date;
    total: number;
    paymentMethod: string;
    purchaseDetailList: Array<PurchaseDetailDto>;
}