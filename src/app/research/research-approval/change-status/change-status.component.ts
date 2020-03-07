import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import { GlobalService } from './../../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import { MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent implements OnInit {
	researchid
	title
	type
	remarks="";
	head
	button='';
  constructor(public dialogRef: MatDialogRef<ChangeStatusComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private global: GlobalService,private http: Http) { 
  		this.researchid = data.id;
  		this.title = data.title;
  		this.type = data.type;

  		if (this.type==2) {
  			this.head = "With Issue Remark";
  			this.button = "Submit Issue";
  		}else 
  		if (this.type==3) {
  			this.head = "Approval Diaglog";
  			this.button = "Approve research";
  		}

  	}

  ngOnInit() {
  }
onNoClickclose(){
       			this.dialogRef.close(0);
}

  changestat(){
  	this.global.swalLoading("");
    let urlSearchParams2 = new URLSearchParams();
	urlSearchParams2.append("rid",this.researchid.toString());
 	urlSearchParams2.append('remarks', this.remarks);
 	urlSearchParams2.append('status', this.type.toString());
    let body2 = urlSearchParams2.toString()
    var header = new Headers();
    header.append("Accept", "application/json");
    header.append("Content-Type", "application/x-www-form-urlencoded");    
    let option2 = new RequestOptions({ headers: header });
		this.http.post(this.global.api + 'api.php?action=spResearchResearchStatus_Insert',body2,option2)
	    .map(response => response.text())
	    .subscribe(res => {
       			this.dialogRef.close(1);
	    		this.global.swalSuccess("Status has been changed!")
	    },Error=>{
	      this.global.swalAlertError();
	    });
  }
}
