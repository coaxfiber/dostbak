import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewChild,ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AddUpdateProjdiscipComponent } from './add-update-projdiscip/add-update-projdiscip.component';

import Swal from 'sweetalert2';
const swal = Swal;
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';

@Component({
  selector: 'app-project-discipline',
  templateUrl: './project-discipline.component.html',
  styleUrls: ['./project-discipline.component.scss']
})
export class ProjectDisciplineComponent implements OnInit {

discipline
dataSource;
	displayedColumns = ['name','action'];
      @ViewChild(MatSort, {static: false}) sort: MatSort;
       @ViewChild('paginator', {static: false}) paginator: MatPaginator;
  constructor(public dialog: MatDialog,public global: GlobalService,private http: Http) { }

  ngOnInit() {
  	this.createtable()
  }
  createtable(){

       this.http.get(this.global.api+'api.php?action=spProgramDiscipline_List')
          .map(response => response.json())
          .subscribe(res => {
           	this.discipline = res;
            this.dataSource = new MatTableDataSource(this.discipline);
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
    const dialogRef = this.dialog.open(AddUpdateProjdiscipComponent, {
      width: '500px',data:{ type: x,data:data }, disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result!=undefined) {
      	this.createtable();
      }
    });
  }

  removediscipline(id){
    this.swalConfirm("Delete Project Dicipline?","You won't be able to revert this!",'warning','Yes','Discipline has been Removed','','delete',id);
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
            this.global.swalLoading("");
            this.http.get(this.global.api+'api.php?action=spProgramDiscipline_Delete&id='+id)
              .map(response => response.text())
              .subscribe(res => {
                this.createtable();
                this.global.swalSuccess(" Project Dicipline has been Permanently Deleted!")
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