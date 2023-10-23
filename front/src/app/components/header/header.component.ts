import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() status = '';

  public currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;
  public responsiveSubscription! : Subscription;
  public screenHeight: any;
  public mainTagHeight: any;
  public showBackArrow: boolean=true;
  public showNavMenu: boolean=true;

  public authenticationRoutes = ["/login", "/register"];
  public authenticatedRoutes = ["/posts", "/topics", "/account", "/create", "/post"];


  constructor(
    public location: Location,
    public responsiveService: ResponsiveService,
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

  public ngOnInit(): void {
    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveSubscription = this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
      if(this.currentBreakpoint!=undefined){
        document.querySelector('.header-element')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.logo_div')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.logo_div')?.setAttribute('status', this.status);
        document.querySelector('.nav-element')?.setAttribute('status', this.status);
        document.querySelector('.back_div')?.setAttribute('status', this.status);
        document.querySelector('.back_div')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('ul')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.mat-icon')?.setAttribute('format', this.currentBreakpoint);
      }
    });
  }

  public ngOnDestroy(): void {
      this.responsiveSubscription.unsubscribe();
  }

  public navigateBack(){
    this.router.navigate(["/welcome"]);
  }

  public click(element:string){
    this.setActive(element);
    this.router.navigate([`/${element}`]);  
  }

  public setActive(element:string){
    document.getElementById("nav_topics")?.setAttribute('active', "false");
    document.getElementById("nav_posts")?.setAttribute('active', "false");
    document.querySelector('.account_circle')?.setAttribute('active', "false");
    document.getElementById("nav_topics_sidenav")?.setAttribute('active', "false");
    document.getElementById("nav_posts_sidenav")?.setAttribute('active', "false");
    document.getElementById("nav_account_sidenav_icon")?.setAttribute('active', "false");
    if(["topics","posts"].includes(element)){
      document.getElementById(`nav_${element}`)?.setAttribute('active', "true");
      document.getElementById(`nav_${element}_sidenav`)?.setAttribute('active', "true")
    }else if(element=="account"){
      document.querySelector('.account_circle')?.setAttribute('active', "true");
      document.getElementById(`nav_account_sidenav_icon`)?.setAttribute('active', "true");       
    }
  }
}