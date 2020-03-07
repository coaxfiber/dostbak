import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { GlobalService } from './../../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ViewChild,ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-add-update-projdiscip',
  templateUrl: './add-update-projdiscip.component.html',
  styleUrls: ['./add-update-projdiscip.component.scss']
})
export class AddUpdateProjdiscipComponent implements OnInit {

title
	id=''
	name=''
	
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<AddUpdateProjdiscipComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private global: GlobalService,private http: Http) {
  	

  	if (data.type==1) {
  		this.title = "Update Discipline";
  		this.name = data.data.name
  		this.id = data.data.id
  	}else {
  		this.title = "Add Discipline";
  	}
  }

  save(x){
  	var y =''
  	if (this.name=='') {
  		y=y+"*Project Discipline name is required!\n";
  	}

  	if(y==''){
  		let urlSearchParams = new URLSearchParams();
	                    urlSearchParams.append("name",this.name.toString());
	                  let body = urlSearchParams.toString()
	      				var header = new Headers();
	                  header.append("Accept", "application/json");
	                  header.append("Content-Type", "application/x-www-form-urlencoded");    
	                  let option = new RequestOptions({ headers: header });
			      this.global.swalLoading('');

			       this.http.post(this.global.api + 'api.php?action=spProgramDisciplineCreate',
			       body,option)
			          .map(response => response.json())
			          .subscribe(res => { 
			          	this.dialogRef.close(1)
			          	console.log(res)
			          	this.global.swalSuccess('Discipline has been added!')
			         });
	  	
  	}else{
  		alert(y);
  	}

  }
  update(x){
  	var y =''
  	if (this.name=='') {
  		y=y+"*Project Discipline name is required!\n";
  	}

  	if(y==''){
  		let urlSearchParams = new URLSearchParams();
	                    urlSearchParams.append("id",this.id.toString());
	                    urlSearchParams.append("name",this.name.toString());
	                  let body = urlSearchParams.toString()
	      				var header = new Headers();
	                  header.append("Accept", "application/json");
	                  header.append("Content-Type", "application/x-www-form-urlencoded");    
	                  let option = new RequestOptions({ headers: header });
			      this.global.swalLoading('');

			       this.http.post(this.global.api + 'api.php?action=spProgramDiscipline_Update',
			       body,option)
			          .map(response => response.json())
			          .subscribe(res => { 
			          	this.dialogRef.close(1)
			          	this.global.swalSuccess('Discipline has been Updated!')
			         });
	  	
  	}else{
  		alert(y);
  	}

  }


  ngOnInit() {
  }

  noclick()
	{
	  this.dialogRef.close(1)
	}
}
