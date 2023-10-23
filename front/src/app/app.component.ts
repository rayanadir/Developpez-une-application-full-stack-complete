import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  
  showHeader: boolean = true;
  status!:string;

  currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;

  constructor(public router: Router){
    this.router.events.subscribe((event:any) => {
      if(event instanceof NavigationEnd){
        if(["/welcome","/404"].includes(router.url)){
          this.showHeader=false;
          this.status="welcome";
        }else{
          this.showHeader=true;
          if(["/login","/register"].includes(router.url)){
            this.status="authentication";
          }else{
            this.status="authenticated";
          }
        }
      }
    })
    
  }

  ngOnInit(): void {
    
  }

}
