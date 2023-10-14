import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit, OnDestroy {

  currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;
  public responsiveSubscription! : Subscription;

  constructor(public router: Router, private responsiveService: ResponsiveService,) { }

  ngOnInit(): void {
    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveSubscription = this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
      if(this.currentBreakpoint!=null){
        document.querySelector('main')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.auth')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.logo__img')?.setAttribute('format', this.currentBreakpoint)
      }
    });
  }

  ngOnDestroy(): void {
      this.responsiveSubscription.unsubscribe();
  }

  navigate(path:string): void {
    this.router.navigate([`/${path}`]);
  }

}
