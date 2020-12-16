import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import { ActivatedRoute } from "@angular/router";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ResearchPopupComponent } from './research-popup/research-popup.component';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResearchComponent implements OnInit {

 	count =''
	array=[]

  author=[]
  keyword=[]
  descipline=[]

  pagestat=''
  constructor(public dialog: MatDialog,public global: GlobalService,private http: Http,private route: ActivatedRoute,private router: Router) { }
  researchpageid
  ngOnInit() {
    this.loadsidnav()    
    this.scrolltop()
  	this.route.paramMap.subscribe(params => {
      this.researchpageid=params.get("q")
    })
    this.route.paramMap.subscribe(params => {
      this.discipline=params.get("discipline")
    })
    if (this.researchpageid==null) {
      if (this.discipline==null) {
        this.router.navigate(['home']);
      }else{
          this.pagestat = 'discipline'
          this.rundiscipline()
      }
    }else{
      this.pagestat = 'research'
      this.runresearch()	
      }
  }

runresearch(){
  this.http.get(this.global.api+'api.php?action=spResearchAuthor_Select&rid='+this.researchpageid,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.author = res  
            this.http.get(this.global.api+'api.php?action=spResearch_Select&id='+this.researchpageid,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
               this.array =res  
               this.http.get(this.global.api+'api.php?action=spResearchKeyword_Select&rid='+this.researchpageid,this.global.option)
                  .map(response => response.json())
                  .subscribe(res => {
                   this.keyword =res  

                    this.http.get(this.global.api+'api.php?action=spResearchProgramDiscipline_Select&rid='+this.researchpageid,this.global.option)
                      .map(response => response.json())
                      .subscribe(res => {
                       this.descipline =res                
                      },Error=>{
                        //console.log(Error);
                        console.log(Error)
                      });                              
                  },Error=>{
                    //console.log(Error);
                    console.log(Error)
                  });                        
              },Error=>{
                //console.log(Error);
                console.log(Error)
              });
          },Error=>{
            //console.log(Error);
            console.log(Error)
          });
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
  Viewpdf(x){ 

  const dialogRef = this.dialog.open(ResearchPopupComponent, {
      width: '99%',data:{x:x}, disableClose: false });

    dialogRef.afterClosed().subscribe(result => {
      if (result==1) { 
      }
    });
}

  openresearch(x){
    this.researchpageid=x
    this.pagestat = 'research'
    this.router.navigate(['../research', { q: x }]);
    this.runresearch()
  }
discipline=''
  openresearchbydiscipline(x){

    this.pagestat = 'discipline'
    this.router.navigate(['../research', { discipline: x }]);
    this.route.paramMap.subscribe(params => {
      this.discipline=params.get("discipline")
    })
    this.discipline=x
    this.rundiscipline()
  }
 
  displayarray=[]
  rundiscipline(){

    this.http.get(this.global.api+'api.php?action=spResearchSearch_ByProgramDisciplineDesc&desc='+this.discipline,this.global.option)
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
