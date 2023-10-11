import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;
  public responsiveSubscription! : Subscription;
  public screenHeight: any;
  public mainTagHeight: any;

  constructor(public router: Router, private responsiveService: ResponsiveService,) { }

  ngOnInit(): void {
    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveSubscription = this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
    });
    this.screenHeight = `${window.innerHeight}px`;
    if(this.currentBreakpoint=="phone"){
      this.mainTagHeight = `${window.innerHeight/6}px`;
    }else if(this.currentBreakpoint=="tablet"){
      this.mainTagHeight = `${window.innerHeight/5}px`;
    }else if(this.currentBreakpoint=="desktop"){
      this.mainTagHeight = `${window.innerHeight/4}px`;
    }
  }

  navigate(path:string): void {
    this.router.navigate([`/${path}`]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.screenHeight = `${event.target.innerHeight}px`;
    if(this.currentBreakpoint=="phone"){
      this.mainTagHeight = `${event.target.innerHeight/6}px`;
    }else if(this.currentBreakpoint=="tablet"){
      this.mainTagHeight = `${event.target.innerHeight/5}px`;
    }else if(this.currentBreakpoint=="desktop"){
      this.mainTagHeight = `${event.target.innerHeight/4}px`;
    }
  }

}
