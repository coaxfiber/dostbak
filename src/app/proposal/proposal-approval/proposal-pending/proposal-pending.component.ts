import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild,ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { ProposalsStatusViewComponent } from './../../proposals/proposals-status-view/proposals-status-view.component';
import { ProposalDocumentComponent } from './../../proposals/proposal-document/proposal-document.component';
import { ViewProposalDetailsComponent } from './../view-proposal-details/view-proposal-details.component';

const swal = Swal;
@Component({
  selector: 'app-proposal-pending',
  templateUrl: './proposal-pending.component.html',
  styleUrls: ['./proposal-pending.component.scss']
})
export class ProposalPendingComponent implements OnInit {
displayedColumns = ['title','user','fagency','datecreated','status','action'];
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

}
openDialogViewProposalDetailsComponent(x){
    const dialogRef = this.dialog.open(ViewProposalDetailsComponent, {
      width: '95%',data:{x:x}, disableClose: false });

    dialogRef.afterClosed().subscribe(result => {
      if (result==1) { 
        this.createTable()
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
returntoDraft(id){
	this.swalConfirm("Return the Status to Draft?","",'warning','Yes','Proposal status has been changed','','returntodraft',id);
  
}
createTable() {

        this.http.get(this.global.api+'api.php?action=proposallistsall',this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.global.swalClose();
            this.tableArr=[];
            for (var i = 0; i < res.length; ++i) {
              if (res[i].status[0].name=="Submitted") {
              this.tableArr.push(res[i])
              }
            }
            console.log( this.tableArr)
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
          if (remove=='returntodraft') {
            this.global.swalLoading('')
                      let urlSearchParams = new URLSearchParams();
                        urlSearchParams.append("proposalid",id.toString());
                         urlSearchParams.append('statusid', '0');
                         urlSearchParams.append('remarks', '');
                         urlSearchParams.append('userid', this.global.requestid());
                         urlSearchParams.append('type', '1');
                          let body = urlSearchParams.toString()
                          var header = new Headers();
                            header.append("Accept", "application/json");
                            header.append("Content-Type", "application/x-www-form-urlencoded");    
                            let option = new RequestOptions({ headers: header });
                       this.http.post(this.global.api + 'api.php?action=statuschange',body,option)
                            .map(response => response.text())
                            .subscribe(res => {
                				this.createTable();
                            });
          }
        }
      })
  }
}
