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

  currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;

  logged:string = "false";

  constructor(private router: Router, private sessionService: SessionService){
    this.router.events.subscribe((event:any) => {
      if(event instanceof NavigationEnd){
        if(["/welcome","/404"].includes(router.url)){
          this.showHeader=false;
        }else{
          this.showHeader=true;
        }
      }
    })
    this.sessionService.$isLogged().subscribe((data) => {
      if(data){
        this.logged = "true"
      }else{
        this.logged = "false";
        router.navigate(['/welcome']);
        sessionService.sessionInformation=undefined
      }
    })
  }


}
