import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { GlobalService } from './../../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ViewChild,ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { AddressLookupComponent } from './../../../registration/address-lookup/address-lookup.component';
@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.scss']
})
export class AddUpdateComponent implements OnInit {
	title

	name=''
	address=''
	phone=''
	mobile=''
	email=''
	fax=''
	industry=''
	perma
	psgc1=''
	street=''
	industrylist
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<AddUpdateComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private global: GlobalService,private http: Http) {
  	

  	if (data.type==1) {
  		this.title = "Company Detail";
  	}else if (data.type==2) {
  		this.title = "Update Company";
  		this.name=data.data.name
		this.perma=data.data.address
		this.phone=data.data.phone
		this.mobile=data.data.mobile
		this.email=data.data.email
		this.fax=data.data.fax
		this.psgc1=data.data.psgc
		this.street=data.data.street
		this.industry=data.data.industry
		this.getindustry();

  	}else {
  		this.title = "Add Company";
		this.getindustry();
  	}
  }
  getindustry(){
  	this.http.get(this.global.api+'api.php?action=spIndustryCode_List',this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	   this.industrylist = res
	  },Error=>{
	    this.global.swalAlertError();
	  });
  }

  save(x){
  	var y =''
  	if (this.name=='') {
  		y=y+"*Company name is required!\n";
  	}
  	if (this.psgc1=='') {
  		y=y+"*Company address is required!\n";
  	}
  	if (this.industry=='') {
  		y=y+"*Industry is required!\n";
  	}

  	if(y==''){
  	if (x==1) {
  		let urlSearchParams = new URLSearchParams();
	                    urlSearchParams.append("name",this.name.toString());
	                    urlSearchParams.append("street",this.street.toString());
	                     urlSearchParams.append('psgc', this.psgc1.toString());
	                     urlSearchParams.append('phone', this.phone.toString());
	                     urlSearchParams.append('mobile', this.mobile.toString());
	                     urlSearchParams.append('email', this.email.toString());
	                     urlSearchParams.append('fax', this.fax.toString());
	                     urlSearchParams.append('industry', this.industry.toString());
	                  let body = urlSearchParams.toString()
	      				var header = new Headers();
	                  header.append("Accept", "application/json");
	                  header.append("Content-Type", "application/x-www-form-urlencoded");    
	                  let option = new RequestOptions({ headers: header });
			      this.global.swalLoading('');

			       this.http.post(this.global.api + 'api.php?action=spCompany_Insert',
			       body,option)
			          .map(response => response.json())
			          .subscribe(res => { 
			          	this.dialogRef.close(1)
			          	this.global.swalSuccess('Company has been added!')
			         });
	  	}else{
	  		let urlSearchParams = new URLSearchParams();
	  					urlSearchParams.append("id",this.data.data.id.toString());
	                    
	                    urlSearchParams.append("name",this.name.toString());
	                    urlSearchParams.append("street",this.street.toString());
	                     urlSearchParams.append('psgc', this.psgc1.toString());
	                     urlSearchParams.append('phone', this.phone.toString());
	                     urlSearchParams.append('mobile', this.mobile.toString());
	                     urlSearchParams.append('email', this.email.toString());
	                     urlSearchParams.append('fax', this.fax.toString());
	                     urlSearchParams.append('industry', this.industry.toString());
	                  let body = urlSearchParams.toString()
	      				var header = new Headers();
	                  header.append("Accept", "application/json");
	                  header.append("Content-Type", "application/x-www-form-urlencoded");    
	                  let option = new RequestOptions({ headers: header });
			      this.global.swalLoading('');

			       this.http.post(this.global.api + 'api.php?action=spCompany_Update',
			       body,option)
			          .map(response => response.json())
			          .subscribe(res => { 
			          	this.dialogRef.close(1)
			          	this.global.swalSuccess('Company has been Updated!')
			         });
	  	}
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
openDialog(x): void {

    const dialogRef = this.dialog.open(AddressLookupComponent, {
      width: '500px', disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
    	if (result!=undefined) {
	    	if (result.result!='cancel') {
	    			this.perma = result.result
	    			this.psgc1 = result.data
	    	}
    	}
    });
  }
}
