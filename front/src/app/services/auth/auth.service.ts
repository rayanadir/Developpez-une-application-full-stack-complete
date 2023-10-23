import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import { TokenResponse } from '../../interfaces/tokenResponse.interface';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathService = "api/auth";

    constructor(private httpClient: HttpClient) { }

    public register(registerRequest: RegisterRequest): Observable<SessionInformation>{
        return this.httpClient.post<SessionInformation>(`${this.pathService}/register`, registerRequest);
    }

    public login(loginRequest: LoginRequest): Observable<SessionInformation> {
        return this.httpClient.post<SessionInformation>(`${this.pathService}/login`, loginRequest);
    }
}
