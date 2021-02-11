import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { GlobalService } from './global.service';
import { AfterViewInit, ElementRef, } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
	public data:any
  search=''
  constructor(private route: ActivatedRoute,private elRef:ElementRef,public global: GlobalService,private router: Router){
    setTimeout(console.log.bind(console, '%cStop!', 'color: red;font-size:75px;font-weight:bold;-webkit-text-stroke: 1px black;'), 0);
    setTimeout(console.log.bind(console, '%cThis is a browser feature intended for developers.', 'color: black;font-size:20px;'), 0);
      this.global.search=''
      this.route.paramMap.subscribe(params => {
      this.search=params.get("q")
      this.global.search=this.search
    })
  }

  ngAfterViewInit() {
     let loader = this.elRef.nativeElement.querySelector('#loader'); 
     //loader.style.display = "none"; //hide loader
     document.getElementById("loader").style.display = "none";
  }
  
  logout(){
  	this.global.logout();
  }
  keysearch(event){
    if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>{
        
      this.router.navigate(['../Search', { q: this.global.search }])});
    }
  }

}
