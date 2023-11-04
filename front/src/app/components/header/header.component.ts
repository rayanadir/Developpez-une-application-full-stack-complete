import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() logged = 'false';

  public screenHeight: any;
  public mainTagHeight: any;
  public showBackArrow: boolean=true;
  public showNavMenu: boolean=true;

  public authenticationRoutes = ["/login", "/register"];
  public authenticatedRoutes = ["/posts", "/topics", "/account", "/create", "/post"];

  constructor(
    public location: Location,
    public router: Router,
    public sessionService: SessionService
    ) {
      this.router.events.subscribe((event:any) => {
        if(event instanceof NavigationEnd){
          if(this.authenticationRoutes.includes(router.url)){
            this.showBackArrow=true;
            this.showNavMenu=false;
            document.querySelector('.logo_div')?.setAttribute('showNavMenu', "false");
          }else if(this.authenticatedRoutes.includes(router.url)){
            this.showBackArrow=false;
            this.showNavMenu=true;
            this.setActive(router.url.substring(1));
          }else if(router.url.includes("/post")){
            document.getElementById("nav_posts")?.setAttribute('active', "false");
            document.getElementById("nav_posts_sidenav")?.setAttribute('active', "false");
          }
        }
      })
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

  public $isLogged(): Observable<boolean>{
    return this.sessionService.$isLogged();
  }

  public disableMain(){
    document.querySelector('.main-posts')?.setAttribute("click","none");
    document.querySelector('.main-account')?.setAttribute("click","none");
    document.querySelector('.main-post')?.setAttribute("click","none");
    document.querySelector('.main-create')?.setAttribute("click","none");
    document.querySelector('.main-topics')?.setAttribute("click","none")
  }

  
  test() {
    document.querySelector('.main-posts')?.removeAttribute("click");
    document.querySelector('.main-account')?.removeAttribute("click");
    document.querySelector('.main-post')?.removeAttribute("click");
    document.querySelector('.main-create')?.removeAttribute("click");
    document.querySelector('.main-topics')?.removeAttribute("click");
  }
}