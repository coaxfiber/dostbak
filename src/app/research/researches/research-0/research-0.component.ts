import { Component, OnInit,Injectable } from '@angular/core';
import { GlobalService } from './../../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild,ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import { ResearchStatusComponent } from './../research-status/research-status.component';
import { ResearchPdfComponent } from './../research-pdf/research-pdf.component';
const swal = Swal;

@Component({
  selector: 'app-research-0',
  templateUrl: './research-0.component.html',
  styleUrls: ['./research-0.component.scss']
})
export class Research0Component implements OnInit {



	displayedColumns = ['title','level','datecreated','status','action'];
      @ViewChild(MatSort,{static:false}) sort: MatSort;
       @ViewChild('paginator',{static:false}) paginator: MatPaginator;

	  dataSource;
	  tableArr:Array<any>;

    injectid
      ngOnInit() {
        this.createTable('1');
      }

      draft=[];
      submmited=[];
      researches
      degreelevel

      title=''
      level=''
      status

      stat=''
      config
      tabselectedvalue=0
  constructor(public dialog: MatDialog,public global: GlobalService,private http: Http,private router: Router) {
    this.stat="Pending"
    if (this.global.researchstat=='Draft') {
      this.tabselectedvalue=1
      this.optionsearch(this.global.researchstat)
      this.global.researchstat=''
    }
    if (this.global.researchstat=='Pending') {
      this.tabselectedvalue=0
      this.optionsearch(this.global.researchstat)
      this.global.researchstat=''
    }

    this.http.get(this.global.api + 'api.php?action=degreelevel',
         this.global.option)
            .map(response => response.json())
            .subscribe(res => {
              this.degreelevel= res;
        });

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
  }
  
  removepermanent(id){
    this.swalConfirmperma("Delete Research?","You won't be able to revert this!",'warning','Yes','Research has been Removed','','delete',id);
  }
   swalConfirmperma(title,text,type,button,d1,d2,remove,id)
  {
    swal({
        title: title,
        type: type,
        html:text,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: button
      }).then((result) => {
        if (result.value) {
          if (remove=='delete') {

            this.global.swalLoading("");
            this.http.get(this.global.api+'api.php?action=researchdelete&researchid='+id)
              .map(response => response.text())
              .subscribe(res => {
                this.createTable('6')
                this.global.swalSuccess("Research has been Permanently Deleted!")
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
          }
        }
      })
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
   optionsearch(x){
     this.stat = x
     if (this.stat == 'Draft') {
      this.createTable('0')
     }
     if (this.stat == 'Pending') {
      this.createTable('1')
     }
     if (this.stat == 'Published') {
      this.createTable('3')
     }
     if (this.stat == 'With Issues') {
      this.createTable('2')
     }
     if (this.stat == 'Trash') {
      this.createTable('6')
     }
   }

  Viewpdf(id){
    var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });
        this.http.get(this.global.api + 'api.php?action=spResearchDocument_Select&rid='+id+"&type=0",
           option)
              .map(response => response.json())
              .subscribe(res => {
                if(res[0].id!=null&&res[0].value!='undefined'){

                const dialogRef = this.dialog.open(ResearchPdfComponent, {
                      width: '90%',data:{pdf: id}, disableClose: true });

                    dialogRef.afterClosed().subscribe(result => {
                      if (result==1) { 
                      }
                    });
                }else{
                  this.global.swalAlert('No main Document','','warning')
                }
            });
  }

  ViewHistory(title,status): void {
    const dialogRef = this.dialog.open(ResearchStatusComponent, {
      width: '50%',data:{title:title,status:status}, disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      if (result==1) { 
      }
    });
  }
  array=[]
  temparray=[]
  temparray2=[]
  createTable(type) {
    this.level=''
    this.title=''
    if (this.global.useraccess!=undefined) {
      this.array=undefined
        this.http.get(this.global.api + 'api.php?action=spResearch_List&company=' + this.global.useraccess.companyid+"&status="+type,
         this.global.option)
            .map(response => response.json())
            .subscribe(res => {
            this.array = res
            this.temparray = res
            console.log(type)
        },error=>{
            console.log(error);
            this.global.swalClose();
        });

      }
    }

updateresearch(id,title,abstract,dlid){
  this.global.researchid = id;
  this.global.researchtitle = title;
  this.global.researchabstract = abstract;
  this.global.researchlevel = dlid;
  this.router.navigate(['../main',{outlets:{div:'update-research'}}]);
}

applyFilter(x) {
  this.array = []
  if (x=='') {
    this.array = []
    for (var i = 0; i < this.temparray.length; ++i) {
      if (this.temparray[i].title.replace(/^\s+|\s+$/gm,'').toUpperCase().includes(this.title.replace(/^\s+|\s+$/gm,'').toUpperCase())) {
       this.array.push(this.temparray[i])
      }
    }
  }else{
    this.temparray2 = []
    for (var i = 0; i < this.temparray.length; ++i) {
      if (x==this.temparray[i].dlid) {
       this.temparray2.push(this.temparray[i])
      }
    }
    for (var i = 0; i < this.temparray2.length; ++i) {
      if (this.temparray2[i].title.replace(/^\s+|\s+$/gm,'').toUpperCase().includes(this.title.replace(/^\s+|\s+$/gm,'').toUpperCase())) {
       this.array.push(this.temparray2[i])
      }
    }
  }


}

applyFilter2(filterValue: string) {
  this.dataSource.filterPredicate = (data:
  {status}, filterValue: string) =>
  data.status[0].id.toLowerCase().indexOf(filterValue) !== -1;

    this.dataSource.filter = filterValue.toLowerCase();

this.title=''
this.level=''
}
applyFilter3(filterValue: string) {
  this.dataSource.filterPredicate = (data:
  {dlid}, filterValue: string) =>
  data.dlid.trim().toLowerCase().indexOf(filterValue) !== -1;

    this.dataSource.filter = filterValue.trim().toLowerCase();
this.title=''
this.status=''
}


removeRole(id){
    this.swalConfirm("Delete Research?","",'warning','Yes','Research has been Removed','','delete',id);
  }
returntoDraft(id){
    this.swalConfirm("Return the Status to Draft?","",'warning','Yes','Research status has been changed','','returntodraft',id);
  }
  swalConfirm(title,text,type,button,d1,d2,remove,id)
  {
    swal({
        title: title,
        type: type,
        html:text,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: button
      }).then((result) => {
        if (result.value) {
          if (remove=='delete') {
            this.global.swalLoading('')
             let urlSearchParams2 = new URLSearchParams();
                urlSearchParams2.append("rid",id);
                 urlSearchParams2.append('remarks', null);
                 urlSearchParams2.append('status', '6');
              let body2 = urlSearchParams2.toString()
              var header = new Headers();
                    header.append("Accept", "application/pdf");
                    header.append("Content-Type", "application/x-www-form-urlencoded");    
                    let option2 = new RequestOptions({ headers: header });
               this.http.post(this.global.api + 'api.php?action=spResearchResearchStatus_Insert',body2,option2)
                    .map(response => response.text())
                    .subscribe(res => {
                      this.global.swalSuccess("Research has been moved to trash!")
                      this.optionsearch(this.stat);
                    });
          }else 
          if (remove=='returntodraft') {
            this.global.swalLoading('')
             let urlSearchParams2 = new URLSearchParams();
                urlSearchParams2.append("rid",id);
                 urlSearchParams2.append('remarks', null);
                 urlSearchParams2.append('status', '0');
              let body2 = urlSearchParams2.toString()
              var header = new Headers();
                    header.append("Accept", "application/pdf");
                    header.append("Content-Type", "application/x-www-form-urlencoded");    
                    let option2 = new RequestOptions({ headers: header });
               this.http.post(this.global.api + 'api.php?action=spResearchResearchStatus_Insert',body2,option2)
                    .map(response => response.text())
                    .subscribe(res => {
                      this.optionsearch(this.stat);
                      this.global.swalSuccess("Changed status to Draft!")
                    });
        }
        }
      })
  }

  ngOnDestroy(){
    this.global.researchstat=''
  }
}
