import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDto } from '../models/carDto';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { PurchaseDetailDto } from '../models/purchaseDetailDto';
const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private numberProducts = new BehaviorSubject(0);

  constructor(private http: HttpClient) {
    this.setNumberProducts();
  }

  public getAllCars() : Observable<CarDto[]> {
    return this.http.get<CarDto[]>(`${apiUrl}/cars`);
  }

  public registerCar(newCar: CarDto): Observable<CarDto> {
    return this.http.post<CarDto>(`${apiUrl}/cars`, newCar);
  }

  public setNumberProducts(): void {
    let count: number = 0;
    let purchaseDetails: Array<PurchaseDetailDto> = JSON.parse(<string>localStorage.getItem("purchaseDetails"));
    if (!purchaseDetails) {
      this.numberProducts.next(0);
      return;
    }
    purchaseDetails.forEach(car => count += car.quantity);
    this.numberProducts.next(count);
  }

  public getNumberProducts(): Observable<number> {
    return this.numberProducts.asObservable();
  }
}