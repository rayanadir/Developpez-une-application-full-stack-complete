import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from './services/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  
  showHeader: boolean = true;
  status!:string;

  currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;

  logged:string = "false";

  constructor(private router: Router, private sessionService: SessionService){
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
    this.sessionService.$isLogged().subscribe((data) => {
      if(data){
        this.logged = "true"
      }else{
        this.logged = "false"
      }
    })
  }


}
