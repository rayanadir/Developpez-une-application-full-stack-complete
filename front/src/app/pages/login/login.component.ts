import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginRequest } from 'src/app/interfaces/loginRequest.interface';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';
import { SessionService } from 'src/app/services/session/session.service';
import { PASSWORD_PATTERN } from 'src/app/constants/password.validator';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;
  public responsiveSubscription! : Subscription;

  public hide : boolean = true;
  public onError : boolean = false;

  public form = this.fb.group({
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


  constructor(
    public fb: FormBuilder,
    public responsiveService: ResponsiveService,
    public router: Router,
    public authService: AuthService,
    public sessionService: SessionService,
    ) { }

  public ngOnInit(): void {
    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveSubscription = this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
      if(this.currentBreakpoint!=undefined){
        document.querySelector('.main-login')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.card-content')?.setAttribute('format', this.currentBreakpoint);
      }
    });
  }

  public ngOnDestroy(): void {
      this.responsiveSubscription.unsubscribe();
  }

  public submit(): void {
    const loginRequest = this.form.value as LoginRequest;
    this.authService.login(loginRequest).subscribe({
      next: (response: SessionInformation) => {
        localStorage.setItem("token", response.token);
        this.sessionService.logIn(response);
        this.router.navigate(["/posts"]);
      },
      error: () => this.onError = true,
    })
  }

}
