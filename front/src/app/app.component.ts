import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //standalone: true,
})
export class AppComponent implements OnInit{
  
  showHeader: boolean = true;

  constructor(public router: Router){
    this.router.events.subscribe((event:any) => {
      if(event instanceof NavigationEnd){
        if(router.url == "/welcome"){
          this.showHeader=false;
        }else{
          this.showHeader=true;
        }
      }
    })
    
  }

  ngOnInit(): void {
    
    
  }


}
