import jwt_decode from "jwt-decode"
import { Injectable } from '@angular/core';
import { getCookie, setCookie } from 'typescript-cookie'
import { CustomerJwtDto } from "../models/customerJwtDto";


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getToken(): string {
    return <string>getCookie("token");
  }

  public saveToken(token: string) : void {
    setCookie("token", token, {expires: 1, path: "/"});
  }

  public deleteToken(): void {

  }

  public getInfoToken(): CustomerJwtDto {
    let infoToken = jwt_decode(<string>getCookie("token"));
    console.log(infoToken);
    return <CustomerJwtDto>infoToken;
  }
}