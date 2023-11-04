import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/interfaces/loginRequest.interface';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SessionService } from 'src/app/services/session/session.service';
import { PASSWORD_PATTERN } from 'src/app/constants/password.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
    public router: Router,
    public authService: AuthService,
    public sessionService: SessionService,
    ) { }

  public ngOnInit(): void {

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
