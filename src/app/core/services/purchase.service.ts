import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { PurchaseRequestDto } from '../models/purchaseRequestDto';
import { Observable } from 'rxjs';
const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  public registerPurchase(newPurchase: PurchaseRequestDto): Observable<any> {
    return this.http.post(`${apiUrl}/compras`, newPurchase);
  }

  public getAllPurchasesByIdCustomer(idCustomer: string): Observable<any> {
    return this.http.get(`${apiUrl}/compras/cliente/${idCustomer}`);
  }
}
