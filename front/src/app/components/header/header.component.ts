import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;
  public responsiveSubscription! : Subscription;
  public screenHeight: any;
  public mainTagHeight: any;
  showBackArrow: boolean=true;
  showNavMenu: boolean=true;

  authenticationRoutes = ["/login", "/register"];
  authenticatedRoutes = ["/posts", "/topics", "/account", "/create"];

  constructor(
    public location: Location,
    private responsiveService: ResponsiveService,
    public router: Router
    ) {
      this.router.events.subscribe((event:any) => {
        if(event instanceof NavigationEnd){
          if(this.authenticationRoutes.includes(router.url)){
            this.showBackArrow=true;
            this.showNavMenu=false;
            if(this.currentBreakpoint!=undefined){
              document.querySelector('.back_div')?.setAttribute('format', this.currentBreakpoint);
              document.querySelector('.logo_div')?.setAttribute('showNavMenu', "false");
            }
          }else if(this.authenticatedRoutes.includes(router.url)){
            this.showBackArrow=false;
            this.showNavMenu=true;
            if(this.currentBreakpoint!=undefined){
              document.querySelector('ul')?.setAttribute('format', this.currentBreakpoint);
              document.querySelector('.mat-icon')?.setAttribute('format', this.currentBreakpoint);
              this.setActive(router.url.substring(1));
            }
          }
        }
      })
     }

  ngOnInit(): void {
    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveSubscription = this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
      if(this.currentBreakpoint!=undefined){
        document.querySelector('header')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.logo_div')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.back_div')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('ul')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.mat-icon')?.setAttribute('format', this.currentBreakpoint);
      }
    });
  }

  ngOnDestroy(): void {
      this.responsiveSubscription.unsubscribe();
  }

  navigateBack(){
    this.location.back();
  }

  click(element:string){
    this.setActive(element);
    this.router.navigate([`/${element}`]);  
  }

  setActive(element:string){
    document.getElementById("nav_topics")?.setAttribute('active', "false");
    document.getElementById("nav_posts")?.setAttribute('active', "false");
    document.querySelector('.account_circle')?.setAttribute('active', "false");
    if(element=="topics" || element=="posts"){
      document.getElementById(`nav_${element}`)?.setAttribute('active', "true");
    }else if(element=="account"){
      document.querySelector('.account_circle')?.setAttribute('active', "true");
    }
  }

}
