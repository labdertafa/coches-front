export interface PurchaseDetailDto {
    purchaseId?: number;
    carId?: number;
    referenceCar?: string;
    quantity: number;
    total: number;
}