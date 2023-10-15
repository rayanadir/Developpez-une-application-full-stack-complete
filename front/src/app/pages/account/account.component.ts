import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy, AfterViewInit {

  currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;
  public responsiveSubscription! : Subscription;

  Arr = Array; //Array type captured in a variable
  num:number = 5;

  constructor(private responsiveService: ResponsiveService) { }

  ngOnInit(): void {
    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveSubscription = this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
      if(this.currentBreakpoint!=undefined){
        document.querySelector('.main-account')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.card')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.subscriptions__list')?.setAttribute('format', this.currentBreakpoint);
      }
    });
  }

  ngOnDestroy(): void {
    this.responsiveSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
      
  }

}
