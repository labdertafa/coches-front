import { Injectable} from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { AuthLoginRequestDto } from '../models/authLoginRequestDto';
import { environment } from 'src/environments/environment.dev';
import { Observable, tap } from 'rxjs'; 
import { AuthLoginResponseDto } from '../models/authLoginResponseDto';
import { TokenService } from './token.service';
import { RegisterRequesDto } from '../models/registerRequestDto';
import { RegisterResponseDto } from '../models/registerResponseDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public signIn(authDto: AuthLoginRequestDto): Observable<AuthLoginResponseDto> {    
    return this.http.post<AuthLoginResponseDto>(this.apiUrl + "/auth/sign-in", authDto).pipe(
      tap(response => {
        this.tokenService.saveToken(response.jwt);
      })
    );
  }

  public register(registerRequesDto: RegisterRequesDto): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>(this.apiUrl + "/auth/register", registerRequesDto);
  }
}