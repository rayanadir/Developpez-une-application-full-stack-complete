import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import { TokenResponse } from '../../interfaces/tokenResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathService = "api/auth";

    constructor(private httpClient: HttpClient) { }

    public register(registerRequest: RegisterRequest): Observable<TokenResponse>{
        return this.httpClient.post<TokenResponse>(`${this.pathService}/register`, registerRequest);
    }

    public login(loginRequest: LoginRequest): Observable<TokenResponse> {
        return this.httpClient.post<TokenResponse>(`${this.pathService}/login`, loginRequest);
    }
}
