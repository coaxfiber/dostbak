import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild,ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { ProposalsStatusViewComponent } from './proposals-status-view/proposals-status-view.component';
import { ProposalDocumentComponent } from './proposal-document/proposal-document.component';
import { UpdateProjectComponent } from './../new-proposal/update-project/update-project.component';

const swal = Swal;
@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.scss']
})
export class ProposalsComponent implements OnInit {
displayedColumns = ['title','fagency','datecreated','status','action'];
      @ViewChild(MatSort,{static:false}) sort: MatSort;
       @ViewChild('paginator',{static:false}) paginator: MatPaginator;

	  dataSource;
	  tableArr:Array<any>;

      ngOnInit() {
             this.createTable();
      }
      
      draft=[];
      submmited=[];
  constructor(public dialog: MatDialog,private global: GlobalService,private http: Http) {
        }
    

    tabClick(tab) {
        this.createTablestatus(tab.index);
    }

openDialogUpdate(x){
 const dialogRef = this.dialog.open(UpdateProjectComponent, {
      width: '99%',data:x, disableClose: false });

    dialogRef.afterClosed().subscribe(result => {
      if (result==1) { 
      }
    });

}
ViewHistory(title,status){

    const dialogRef = this.dialog.open(ProposalsStatusViewComponent, {
      width: '50%',data:{title:title,status:status}, disableClose: false });

    dialogRef.afterClosed().subscribe(result => {
      if (result==1) { 
      }
    });

}
Viewpdf(x){ 

  const dialogRef = this.dialog.open(ProposalDocumentComponent, {
      width: '50%',data:{x:x}, disableClose: false });

    dialogRef.afterClosed().subscribe(result => {
      if (result==1) { 
      }
    });
}
createTable() {

        this.http.get(this.global.api+'api.php?action=proposallists&user='+this.global.userid,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.global.swalClose();
            this.tableArr=[];
            for (var i = 0; i < res.length; ++i) {
              if (res[i].status[0].name=="Draft") {
              this.tableArr.push(res[i])
              }
            }
            //console.log( this.tableArr)
            this.dataSource = new MatTableDataSource(this.tableArr);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          },Error=>{
            //console.log(Error);
            console.log(Error)
          });
      }

createTablestatus(text){

                 if (text==0) {
                    this.dataSource = new MatTableDataSource(this.draft);
                 }
                 else if(text==1) {
                    this.dataSource = new MatTableDataSource(this.submmited);
                 }

            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
}


applyFilter(filterValue: string) {
  this.dataSource.filterPredicate = (data:
  {GeneralTitle: string}, filterValue: string) =>
  data.GeneralTitle.trim().toLowerCase().indexOf(filterValue) !== -1;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


applyFilterstatus(filterValue: string) {
  this.dataSource.filterPredicate = (data:
  {status: string}, filterValue: string) =>
  data.status.trim().toLowerCase().indexOf(filterValue) !== -1;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

applyFilteragency(filterValue: string) {
  this.dataSource.filterPredicate = (data:
  {status: string}, filterValue: string) =>
  data.status.trim().toLowerCase().indexOf(filterValue) !== -1;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

removeRole(id){
    this.swalConfirm("Are you sure?","You won't be able to revert this!",'warning','Delete Proposal','Proposal has been Removed','','role',id);
}
  
swalConfirm(title,text,type,button,d1,d2,remove,id){
    swal({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: button
      }).then((result) => {
        if (result.value) {
          if (remove=='role') {
          this.global.swalLoading('');
            this.http.get(this.global.api+'api.php?action=proposaldelete&proposalid='+id)
              .map(response => response.json())
              .subscribe(res => {
                this.createTable();
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
          }
        }
      })
  }
}
