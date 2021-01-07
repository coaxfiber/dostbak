import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import { ActivatedRoute } from "@angular/router";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-researches-page',
  templateUrl: './researches-page.component.html',
  styleUrls: ['./researches-page.component.css']
})
export class ResearchesPageComponent implements OnInit {




 	count =''
	array=[]

  author=[]
  keyword=[]
  descipline=[]

  pagestat=''
  constructor(public dialog: MatDialog,public global: GlobalService,private http: Http,private route: ActivatedRoute,private router: Router) { }
  researchpageid

  company=''

  tempsearch=''
  search=''
  config
  ngOnInit() {
     this.global.activepage='search'
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
    this.loadsidnav()    
    this.scrolltop()
  	this.runsearch()

  }


  pageChanged(event){
    this.
    config.currentPage = event;
  }

  keysearch(event){
    if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
      this.global.search = this.search
        this.tempsearch = this.search
      this.router.navigate(['../Search', { q: this.search }]);
    }
  }
 sidediscicpline1=[]
 sidediscicpline2=[]
 com1=[]
 com2=[]
  loadsidnav(){
    this.http.get(this.global.api+'api.php?action=spProgramDiscipline_List',this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            for (var i = 0; i < res.length; ++i) {
              if (i<5) {
                 this.sidediscicpline1.push(res[i])
              }else{
                 this.sidediscicpline2.push(res[i])
              }
            }
            this.http.get(this.global.api+'api.php?action=company_List',this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                for (var i = 0; i < res.length; ++i) {
                  if (i<5) {
                     this.com1.push(res[i])
                  }else{
                     this.com2.push(res[i])
                  }
                }              
              },Error=>{
                //console.log(Error);
                console.log(Error)
              });                         
          },Error=>{
            //console.log(Error);
            console.log(Error)
          });       
  }

  scrolltop(){
        let scrollToTop = window.setInterval(() => {
            let pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20); // how far to scroll on each step
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 16);
  }


  displayarray=[]
  runsearch(){
  		this.global.swalLoading('')
  		this.http.get(this.global.api+'api.php?action=spResearch_Liststatus&status=3',this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.displayarray = res
            this.global.swalClose()
            console.log(res)
          },Error=>{
            //console.log(Error);
            this.global.swalClose()
            console.log(Error)
          });
  }
}
