import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDto } from '../models/carDto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { 

  }

  public getAllCars() : Observable<CarDto[]> {
    return this.http.get<CarDto[]>(`${apiUrl}/cars`);
  }

  public registerCar(newCar: CarDto): Observable<CarDto> {
    return this.http.post<CarDto>(`${apiUrl}/cars`, newCar);
  }
}