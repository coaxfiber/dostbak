import { Component, OnInit } from '@angular/core';
import { MatStepper,MatDialog,MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Inject} from '@angular/core';
import { GlobalService } from './../../../global.service';
@Component({
  selector: 'app-manage-author',
  templateUrl: './manage-author.component.html',
  styleUrls: ['./manage-author.component.scss']
})
export class ManageAuthorComponent implements OnInit {
	fname='';
	lname='';
	mname='';
	sname='';
  constructor(private global: GlobalService,private http: Http,public dialogRef: MatDialogRef<ManageAuthorComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,) { }
  noclick(x){
  	if (x==0) {
  		 this.dialogRef.close(0)
  	}else{
  	var y='';
  	if ((this.fname==null||this.fname=='')) 
          y=y+"*First Name is required\n";
  	if ((this.lname==null||this.lname=='')) 
          y=y+"*Last Name is required\n";
		      if (y=='') {
		      	// code...
		  		let urlSearchParams = new URLSearchParams();
		                        urlSearchParams.append("fname",this.fname.toString());
		                         urlSearchParams.append('mname', this.mname );
		                         urlSearchParams.append('lname', this.lname);
		                         urlSearchParams.append('sname', this.sname);
		                         urlSearchParams.append('cid', this.global.useraccess.companyid);
		                      let body = urlSearchParams.toString()
		          var header = new Headers();
		                      header.append("Accept", "application/json");
		                      header.append("Content-Type", "application/x-www-form-urlencoded");    
		                      let option = new RequestOptions({ headers: header });
		          this.global.swalLoading('Adding Author...');
		           this.http.post(this.global.api + 'api.php?action=spAuthor_Insert',
		           body,option)
		              .map(response => response.text())
		              .subscribe(res => {
		              	console.log(res)
		                 	this.global.swalClose();  
		  		 			this.dialogRef.close(1)
		              },error => {
		                console.log(Error); 
		                    this.global.swalAlertError();
		               } );
		  	}else
      			alert(y)
      }
  }
  ngOnInit() {
  }

}
