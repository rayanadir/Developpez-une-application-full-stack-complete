import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';
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
export class AccountComponent implements OnInit, OnDestroy {

  public currentBreakpoint: "desktop" | "tablet" | "phone" | undefined;
  public responsiveSubscription!: Subscription;
  public user: User | undefined;
  public accountForm: FormGroup | undefined;
  public onError = false;
  public form = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    username: [
      '',
      [
        Validators.required,
        Validators.min(3),
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.min(8),
        Validators.pattern(PASSWORD_PATTERN),
      ]
    ],
  });
  public hide : boolean = true;
  public subscriptions: Topic[] | undefined;
  private id: string | undefined;
  

  constructor(
    public responsiveService: ResponsiveService,
    public router: Router,
    public sessionService: SessionService,
    public subscriptionsService: SubscriptionsService,
    public userService: UserService,
    public fb: FormBuilder,
    public matSnackBar: MatSnackBar,
    public route: ActivatedRoute,
    ) { }

  public ngOnInit(): void {
    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveSubscription = this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
      if (this.currentBreakpoint != undefined) {
        document.querySelector('.main-account')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.card')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.subscriptions__list')?.setAttribute('format', this.currentBreakpoint);
      }
    });
    this.userService.detail(this.sessionService.sessionInformation!.id.toString()).subscribe((user: User) => {
      this.user = user
      console.log(this.user);
      
    });
    this.getSubscriptions()
    
    
    //this.id = this.user?.id?.toString();
  }

  public ngOnDestroy(): void {
    this.responsiveSubscription.unsubscribe();
  }

  public logout(): void {
    localStorage.removeItem("token");
    this.sessionService.logOut();
    this.router.navigate(['']);
  }

  public submit(): void {
    const accountRequest = this.form?.value as AccountRequest;
    this.userService.update(""/*this.id!*/,accountRequest).subscribe({
      next: (_:User) => {this.matSnackBar.open('Compte mis à jour !', 'Close', {duration: 5000}); this.onError=false},
      error: () => this.onError=true,
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

   
}
