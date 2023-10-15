import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy, AfterViewInit {

  currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;
  public responsiveSubscription! : Subscription;

  Arr = Array; //Array type captured in a variable
  num:number = 5;

  constructor(private responsiveService: ResponsiveService) {
    this.currentBreakpoint = this.responsiveService.breakpointChanged();
    if(this.currentBreakpoint!=undefined){
      document.querySelector('main')?.setAttribute('format', this.currentBreakpoint);
      document.querySelector('.create-filter')?.setAttribute('format', this.currentBreakpoint);
      document.querySelector('.posts')?.setAttribute('format', this.currentBreakpoint);
    }
   }

  ngOnInit(): void {
    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveSubscription = this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
      if(this.currentBreakpoint!=undefined){
        document.querySelector('.main-posts')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.create-filter')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.posts')?.setAttribute('format', this.currentBreakpoint);
      }
    });
  }

  ngOnDestroy(): void {
      this.responsiveSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
      if(this.currentBreakpoint!=undefined){
        document.querySelector('.main-posts')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.create-filter')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.posts')?.setAttribute('format', this.currentBreakpoint);
      }
  }
}
