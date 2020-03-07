import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewChild,ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { GrantAddUpdateComponent } from './grant-add-update/grant-add-update.component';


import Swal from 'sweetalert2';
const swal = Swal;
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';

@Component({
  selector: 'app-grant-management',
  templateUrl: './grant-management.component.html',
  styleUrls: ['./grant-management.component.scss']
})
export class GrantManagementComponent implements OnInit {
fundingagency
grants=null
dataSource;
fagency=''
	displayedColumns = ['name','start','end','action'];
      @ViewChild(MatSort, {static: false}) sort: MatSort;
       @ViewChild('paginator', {static: false}) paginator: MatPaginator;
  constructor(public dialog: MatDialog,private global: GlobalService,private http: Http) { }

  ngOnInit() {
  	 this.http.get(this.global.api + 'api.php?action=FundingAgency_List',
         this.global.option)
            .map(response => response.json())
            .subscribe(res => {
              this.fundingagency= res;
        });
  }
  createtable(x){
    this.grants=undefined;
       this.http.get(this.global.api+'api.php?action=spCallForProposal_Select&id='+x,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            //console.log(res)
           	this.grants = res;
            this.dataSource = new MatTableDataSource(this.grants);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          },Error=>{
           this.global.swalAlertError();
		   console.log(Error)
		  });
  }
	applyFilter(filterValue: string) {
	  this.dataSource.filterPredicate = (data:
	  {name: string}, filterValue: string) =>
	  data.name.trim().toLowerCase().indexOf(filterValue) !== -1;

	    this.dataSource.filter = filterValue.trim().toLowerCase();
	}



  openDialog(x,data): void {
    const dialogRef = this.dialog.open(GrantAddUpdateComponent, {
      width: '500px',data:{ x: x,data:this.fundingagency,fagency:this.fagency,grants:data }, disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result!=undefined) {
        if (result.result!=0) {
          // code...
          this.createtable(this.fagency);
        }
      }
    });
  }

  removegrant(id){
    this.swalConfirm("Delete Grant?","You won't be able to revert this!",'warning','Yes','Grant has been Removed','','delete',id);
  }
	addtitle


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
            this.global.swalLoading("");
            this.http.get(this.global.api+'api.php?action=spCallForProposal_Delete&id='+id)
              .map(response => response.text())
              .subscribe(res => {
                this.createtable(this.fagency);
                this.global.swalSuccess("Grant has been Permanently Deleted!")
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