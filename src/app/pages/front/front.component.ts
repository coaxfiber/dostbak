import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Router} from "@angular/router";
@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {
	count =''
	array=[]
  constructor(public global: GlobalService,private http: Http,private router: Router) { }
  
  ngOnInit() {
    this.global.activepage='front'
    document.getElementById("input").focus();
    this.search = this.global.search
  	this.http.get(this.global.api+'api.php?action=spRPTResearch_TotalCount_byStatus&x=3',this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.count = res[0].count
            this.http.get(this.global.api+'api.php?action=spRPTResearch_RecentlyPublished',this.global.option)
		          .map(response => response.json())
		          .subscribe(res => {
                //console.log(res)
					      this.array = res	        			            
		          },Error=>{
		            //console.log(Error);
		            console.log(Error)
		          });
          },Error=>{
            //console.log(Error);
            console.log(Error)
          });
  }
  search=''
  ngOnDestroy(){
    this.global.activepage='notfront'
  }
  keysearch(event){
    if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
      this.global.search = this.search
      if (this.search==null) {
       this.search = ''
      }
      if (this.search!='') {
          this.router.navigate(['../Search', { q: this.search }]);
      }
    }
  }

}
