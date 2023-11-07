import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/interfaces/loginRequest.interface';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SessionService } from 'src/app/services/session/session.service';
import { PASSWORD_PATTERN } from 'src/app/constants/password.validator';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public hide : boolean = true;
  public onError : boolean = false;

  public form : FormGroup = this.fb.group({
    email: [
      'rayan@rayan.com',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      'Motdepasse*1',
      [
        Validators.required,
        Validators.min(8),
        Validators.pattern(PASSWORD_PATTERN)
      ]
    ]
  });

  public loading : boolean= false;
  public loginSubscription!: Subscription

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public authService: AuthService,
    public sessionService: SessionService,
    ) { }

  public ngOnInit(): void {
    
  }

  public ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();    
  }

  public submit(): void {
    const loginRequest = this.form.value as LoginRequest;
    this.loading=true;
    this.loginSubscription = this.authService.login(loginRequest).subscribe({
      next: (response: SessionInformation) => {
        this.loading=false;
        localStorage.setItem("token", response.token);
        this.sessionService.logIn(response);
        this.router.navigate(["/posts"]);
      },
      error: () => {
        this.onError = true;
        this.loading=false;
      },
    })
  }

}
