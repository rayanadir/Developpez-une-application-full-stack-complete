import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  public currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;
  public responsiveSubscription! : Subscription;

  constructor(public responsiveService: ResponsiveService) { }

  public ngOnInit(): void {
    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveSubscription = this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
      if(this.currentBreakpoint!=undefined){
        document.querySelector('.not-found')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.img')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.title')?.setAttribute('format', this.currentBreakpoint);
      }
    });
  }

  public ngOnDestroy(): void {
      this.responsiveSubscription.unsubscribe();
  }

}
