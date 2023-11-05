import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PASSWORD_PATTERN } from 'src/app/constants/password.validator';
import { RegisterRequest } from 'src/app/interfaces/registerRequest.interface';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public onError : boolean = false;
  public onErrorEmail = false;

  public form = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ],
    ],
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.min(8),
        Validators.pattern(PASSWORD_PATTERN),
      ]
    ]
  })

  public hide : boolean = true;
  public loading : boolean = false;

  constructor(
    public responsiveService: ResponsiveService,
    public fb: FormBuilder,
    public authService: AuthService,
    public sessionService: SessionService,
    public router: Router,
    ) { }

  ngOnInit(): void { }

  public submit(): void {
    const registerRequest = this.form.value as RegisterRequest;
    this.loading=true;
    this.authService.register(registerRequest).subscribe({
      next: (response: SessionInformation) => {
        this.loading=false;
        localStorage.setItem("token", response.token);
        this.sessionService.logIn(response);
        this.router.navigate(['/posts']);
      },
      error: (e) => {
        this.loading=false
        if(e.error.message==="Error: Email is already taken!"){
          this.onErrorEmail=true;
        }else{
          this.onError = true;
          this.onErrorEmail=false;
        }
      }, 
    })
  }

}
