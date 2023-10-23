import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, OnDestroy {

  public currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;
  public responsiveSubscription! : Subscription;

  constructor(public responsiveService: ResponsiveService, public router: Router) { }

  public ngOnInit(): void {
    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveSubscription = this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
      if(this.currentBreakpoint!=undefined){
        document.querySelector('.main-create')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.card-header')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.create-content')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.title')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.back')?.setAttribute('format', this.currentBreakpoint);
      }
    });
  }

  public ngOnDestroy(): void {
      this.responsiveSubscription.unsubscribe()
  }

  public back(){
    this.router.navigate(['/posts'])
  }

}
