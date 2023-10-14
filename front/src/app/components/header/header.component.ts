import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;
  public responsiveSubscription! : Subscription;
  public screenHeight: any;
  public mainTagHeight: any;
  showBackArrow: boolean=true;

  routes = ["/login", "/register"];

  constructor(
    public location: Location,
    private responsiveService: ResponsiveService,
    public router: Router
    ) {
      this.router.events.subscribe((event:any) => {
        if(event instanceof NavigationEnd){
          if(this.routes.includes(router.url)){
            this.showBackArrow=true;
          }else{
            this.showBackArrow=false;
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
    });
    
  }

  navigateBack(){
    this.location.back();
  }

}
