import { Component, OnInit,Injectable } from '@angular/core';
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild,ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
const swal = Swal;

import { NewProposalComponent } from './../../proposal/new-proposal/new-proposal.component';
import { ProposalsStatusViewComponent } from './proposals-status-view/proposals-status-view.component';
import { ProposalDocumentComponent } from './proposal-document/proposal-document.component';
import { UpdateProjectComponent } from './../new-proposal/update-project/update-project.component';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.scss']
})
export class ProposalsComponent implements OnInit {


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

    this.http.get(this.global.api + 'api.php?action=degreelevel')
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
                this.createTable('Trash')
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
     this.createTable(this.stat)
   }

  Viewpdf(id){
    var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });
        this.http.get(this.global.api + 'api.php?action=spResearchDocument_Select&rid='+id+"&type=0")
              .map(response => response.json())
              .subscribe(res => {
                if(res[0].id!=null&&res[0].value!='undefined'){

                const dialogRef = this.dialog.open(ProposalDocumentComponent, {
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
    const dialogRef = this.dialog.open(ProposalsStatusViewComponent, {
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
        
        this.http.get(this.global.api+'api.php?action=proposallists&user='+this.global.userid)
          .map(response => response.json())
          .subscribe(res => {
            this.global.swalClose();
            this.array = []
            this.temparray = []
            for (var i = 0; i < res.length; ++i) {
              if (this.stat==res[i].status[0].name) {
                this.array.push(res[i])
              }
            }
            this.temparray = this.array
        },error=>{
            console.log(error);
            this.global.swalClose();
        });

      }
    }

updateresearch(id){
  this.global.proposalid = id;
  this.router.navigate(['../main',{outlets:{div:'update-proposal'}}]);
}

applyFilter() {
    this.array = []
    for (var i = 0; i < this.temparray.length; ++i) {
      if (this.temparray[i].GeneralTitle.replace(/^\s+|\s+$/gm,'').toUpperCase().includes(this.title.replace(/^\s+|\s+$/gm,'').toUpperCase())) {
       this.array.push(this.temparray[i])
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
    this.swalConfirm("Delete Proposal?","You won't be able to revert this!",'warning','Yes','Proposal has been Deleted','','delete',id);
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
          this.global.swalLoading('');
            this.http.get(this.global.api+'api.php?action=proposaldelete&proposalid='+id)
              .map(response => response.json())
              .subscribe(res => {
                 this.optionsearch(this.stat);
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
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

inputcompanyid=''
  openDialogUpdate(): void {
    this.inputcompanyid = this.global.inputcompanyid
    const dialogRef = this.dialog.open(NewProposalComponent, {
      width: '99%',data:{company:this.inputcompanyid}, disableClose: true });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result==5) {
        this.router.navigate(['../main',{outlets:{div:'proposals-Draft'}}]); 
      }
      if (result==6) {
        this.router.navigate(['../main',{outlets:{div:'proposals-Pending'}}]); 
      }
    });
  }  
}
