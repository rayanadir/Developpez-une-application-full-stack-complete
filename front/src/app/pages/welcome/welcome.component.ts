import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit, OnDestroy {

  public currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;
  public responsiveSubscription! : Subscription;
  public header! : HeaderComponent

  constructor(public router: Router, public responsiveService: ResponsiveService,) { }

  public ngOnInit(): void {
    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveSubscription = this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
      if(this.currentBreakpoint!=null){
        document.querySelector('.main-welcome')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.auth')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.logo__img')?.setAttribute('format', this.currentBreakpoint)
      }
    });
  }

  public ngOnDestroy(): void {
      this.responsiveSubscription.unsubscribe();
  }

  public navigate(path:string): void {
    this.router.navigate([`/${path}`]);
  }

}
