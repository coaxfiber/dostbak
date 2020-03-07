import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { GlobalService } from './global.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  routerlink = "login";
	public data:any
  constructor(public global: GlobalService,private router: Router){
     setTimeout(console.log.bind(console, '%cStop!', 'color: red;font-size:75px;font-weight:bold;-webkit-text-stroke: 1px black;'), 0);
    setTimeout(console.log.bind(console, '%cThis is a browser feature intended for developers.', 'color: black;font-size:20px;'), 0);
   

  }

  logout(){
  	this.global.logout();
  }
}
