import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit, OnDestroy, AfterViewInit {

  public currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;
  public responsiveSubscription! : Subscription;

  Arr = Array; //Array type captured in a variable
  num:number = 5;

  constructor(public responsiveService: ResponsiveService) {  }

  public ngOnInit(): void {
    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveSubscription = this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
      if(this.currentBreakpoint!=undefined){
        document.querySelector('.main-topics')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.topics')?.setAttribute('format', this.currentBreakpoint);
      }
    });
  }

  public ngOnDestroy(): void {
      this.responsiveSubscription.unsubscribe();
  }

  public ngAfterViewInit(): void {
    if(this.currentBreakpoint!=undefined){
      document.querySelector('.main-topics')?.setAttribute('format', this.currentBreakpoint);
      document.querySelector('.topics')?.setAttribute('format', this.currentBreakpoint);
    }
  }

}
