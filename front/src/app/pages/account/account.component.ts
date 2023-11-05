import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { SessionService } from 'src/app/services/session/session.service';
import { UserService } from 'src/app/services/user/user.service';
import { AccountRequest } from 'src/app/interfaces/accountRequest.interface';
import { PASSWORD_PATTERN } from 'src/app/constants/password.validator';
import { SubscriptionsService } from 'src/app/services/subscriptions/subscriptions.service';
import { Topic } from 'src/app/interfaces/topic.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public user: User | undefined;
  public accountForm!: FormGroup;
  public onError = false;
  public onErrorEmail = false;
  public hide : boolean = true;
  public subscriptions: Topic[] | undefined;
  private id: string | undefined;
  public loading : boolean = false;

  constructor(
    public router: Router,
    public sessionService: SessionService,
    public subscriptionsService: SubscriptionsService,
    public userService: UserService,
    public fb: FormBuilder,
    public matSnackBar: MatSnackBar,
    public route: ActivatedRoute,
    ) {
     }

  public ngOnInit(): void {
    this.userService.detail().subscribe((user: User) => {
      this.user = user;
      this.id = this.user.id?.toString();
      this.initForm(user);
    });
    this.getSubscriptions()
    
  }

  public logout(): void {
    localStorage.removeItem("token");
    this.sessionService.logOut();
    this.router.navigate(['']);
  }

  public submit(): void {
    const accountRequest = this.accountForm.value as AccountRequest;
    this.loading=true;
    this.userService.update(this.id!,accountRequest).subscribe({
      next: (_:User) => {
        this.loading=false;
        this.matSnackBar.open('Compte mis à jour !', 'Close', {duration: 5000});
        this.onError=false;
        this.onErrorEmail=false;
      },
      error: (e) => {
        this.loading=false
        if(e.error.message==="Error: Email is already taken!"){
          this.onErrorEmail=true;
        }else{
          this.onError=true;
          this.onErrorEmail=false;
        }
      },
    })
  }

  public getSubscriptions() : void {
    this.subscriptionsService.all().subscribe((subscriptions) => {
      this.subscriptions = subscriptions.map((subscription: Topic) => {
        subscription.isSubscribed=true;
        return subscription
      });
    })
  }

  public click(id: number) : void {
    this.subscriptionsService.click(id).subscribe((res) => {
      let subscription = this.subscriptions?.find((s) =>  s.id === id);
      if(res.message === "Subscribed !" && subscription){
        subscription.isSubscribed=true;
      }else if(res.message === "Unsubscribed !" && subscription){
        subscription.isSubscribed=false;
      }
    });
  }

  private initForm(user: User){
    this.accountForm = this.fb.group({
      email: [
        user ? user.email : '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      name: [
        user ? user.name : '',
        [
          Validators.required,
          Validators.minLength(3),
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(PASSWORD_PATTERN),
        ]
      ],
    })
  }
   
}
