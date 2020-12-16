import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import { ActivatedRoute } from "@angular/router";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-research-bycompany',
  templateUrl: './research-bycompany.component.html',
  styleUrls: ['./research-bycompany.component.css']
})
export class ResearchBycompanyComponent implements OnInit {


 	count =''
	array=[]

  author=[]
  keyword=[]
  descipline=[]

  pagestat=''
  constructor(public dialog: MatDialog,public global: GlobalService,private http: Http,private route: ActivatedRoute,private router: Router) { }
  researchpageid

  company=''
  ngOnInit() {
    this.loadsidnav()    
    this.scrolltop()
  	this.route.paramMap.subscribe(params => {
      this.company=params.get("company")
    })
    if (this.company==null) {
      this.router.navigate(['home']);
    }else{
      this.runcompany()	
    }
    console.log(this.company)
  }
  openresearchbycompany(c){
	this.company=c
	this.runcompany()
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

  openresearch(x){
    this.router.navigate(['../research', { q: x }]);
  }
discipline=''
  opencompany(x){
    this.scrolltop()
    this.router.navigate(['../research-by-company', { discipline: x }]);
    this.route.paramMap.subscribe(params => {
      this.company=params.get("company")
    })
    this.company=x
    this.runcompany()
  }
 
  displayarray=[]
  runcompany(){
    this.http.get(this.global.api+'api.php?action=spResearchSearch_ByCompany&name='+this.company,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.displayarray = res
            console.log(res)
          },Error=>{
            //console.log(Error);
            console.log(Error)
          });
  }
}
