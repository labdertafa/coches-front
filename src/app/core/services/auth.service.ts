import { Injectable} from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { AuthLoginRequestDto } from '../models/authLoginRequestDto';
import { environment } from 'src/environments/environment.dev';
import { Observable } from 'rxjs'; 
import { AuthLoginResponseDto } from '../models/authLoginResponseDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public signIn(authDto: AuthLoginRequestDto): Observable<AuthLoginResponseDto> {
    return this.http.post<AuthLoginResponseDto>(this.apiUrl + "/auth/sign-in", authDto);
  }
}
