import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy, AfterViewInit {

  public currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;
  public responsiveSubscription! : Subscription;

  Arr = Array; //Array type captured in a variable
  num:number = 5;

  constructor(public responsiveService: ResponsiveService, public router: Router) { }

  public ngOnInit(): void {
    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveSubscription = this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
      if(this.currentBreakpoint!=undefined){
        document.querySelector('.main-post')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.post')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.card-header')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.comments')?.setAttribute('format', this.currentBreakpoint);
        document.querySelectorAll('.comments__comment').forEach((e) => {
          if(this.currentBreakpoint) e.setAttribute('format', this.currentBreakpoint)
        })
        document.querySelectorAll('.comments__comment__text').forEach((e) => {
          if(this.currentBreakpoint) e.setAttribute('format', this.currentBreakpoint)
        })
        document.querySelector('.comment')?.setAttribute('format', this.currentBreakpoint);
        document.getElementById('send')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('hr')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.div_back')?.setAttribute('format',this.currentBreakpoint);
      }
    });
  }

  public ngOnDestroy(): void {
    this.responsiveSubscription.unsubscribe();
  }

  public ngAfterViewInit(): void {
      if(this.currentBreakpoint!=undefined){
        document.querySelectorAll('.comments__comment').forEach((e) => {
          if(this.currentBreakpoint) e.setAttribute('format', this.currentBreakpoint)
        })
        document.querySelectorAll('.comments__comment__text').forEach((e) => {
          if(this.currentBreakpoint) e.setAttribute('format', this.currentBreakpoint)
        });
        document.querySelector('.div_back')?.setAttribute('format',this.currentBreakpoint);
      }
  }

  public back(){
    this.router.navigate(['/posts']);
  }
}
