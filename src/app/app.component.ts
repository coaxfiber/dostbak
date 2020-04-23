import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { GlobalService } from './global.service';
import { AfterViewInit, ElementRef, } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  routerlink = "login";
	public data:any
  constructor(private elRef:ElementRef,public global: GlobalService,private router: Router){
    setTimeout(console.log.bind(console, '%cStop!', 'color: red;font-size:75px;font-weight:bold;-webkit-text-stroke: 1px black;'), 0);
    setTimeout(console.log.bind(console, '%cThis is a browser feature intended for developers.', 'color: black;font-size:20px;'), 0);

  }

  ngAfterViewInit() {
     let loader = this.elRef.nativeElement.querySelector('#loader'); 
     //loader.style.display = "none"; //hide loader
     document.getElementById("loader").style.display = "none";
  }
  
  logout(){
  	this.global.logout();
  }
}
