import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import { GlobalService } from './../../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import { MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-status-change-proposal',
  templateUrl: './status-change-proposal.component.html',
  styleUrls: ['./status-change-proposal.component.scss']
})
export class StatusChangeProposalComponent implements OnInit {
	id
	title
	type
	remarks="";
	head
	button='';
  constructor(public dialogRef: MatDialogRef<StatusChangeProposalComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { 
  		this.id = data.id;
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
    	let urlSearchParams = new URLSearchParams();
  	this.global.swalLoading("");
    if (this.data.type==3) {
	    urlSearchParams.append("proposalid",this.id.toString());
	     urlSearchParams.append('statusid', '7');
	     urlSearchParams.append('remarks', '');
	     urlSearchParams.append('userid', this.global.requestid());
	     urlSearchParams.append('type', '1');
    }else{
	    urlSearchParams.append("proposalid",this.id.toString());
	     urlSearchParams.append('statusid', '10');
	     urlSearchParams.append('remarks', this.remarks);
	     urlSearchParams.append('userid', this.global.requestid());
	     urlSearchParams.append('type', '1');
    }
  
	      let body = urlSearchParams.toString()
	      var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });
   this.http.post(this.global.api + 'api.php?action=statuschange',body,option)
        .map(response => response.text())
        .subscribe(res => {
   			this.dialogRef.close(1);
   			if (this.data.type==3) {
    		this.global.swalSuccess("Proposal has been Approved!")
   				// code...
   			}else{
    		this.global.swalSuccess("Proposal has been marked as with issue!")

   			}
                            },Error=>{
	      this.global.swalAlertError();
	    });
  }
}
