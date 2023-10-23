import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy, AfterViewInit {

  public currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;
  public responsiveSubscription! : Subscription;

  Arr = Array; //Array type captured in a variable
  num:number = 5;

  constructor(public responsiveService: ResponsiveService, public router: Router) {
    this.currentBreakpoint = this.responsiveService.breakpointChanged();
    if(this.currentBreakpoint!=undefined){
      document.querySelector('main')?.setAttribute('format', this.currentBreakpoint);
      document.querySelector('.create-filter')?.setAttribute('format', this.currentBreakpoint);
      document.querySelector('.posts')?.setAttribute('format', this.currentBreakpoint);
    }
   }

   public ngOnInit(): void {
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

  public ngOnDestroy(): void {
      this.responsiveSubscription.unsubscribe();
  }

  public ngAfterViewInit(): void {
      if(this.currentBreakpoint!=undefined){
        document.querySelector('.main-posts')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.create-filter')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.posts')?.setAttribute('format', this.currentBreakpoint);
      }
  }

  public navigate(){
    this.router.navigate(['/create']);
  }

  public navigateToPost(){
    this.router.navigate(['/post']);

  }
}
