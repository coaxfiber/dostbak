import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { GlobalService } from './../../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ViewChild,ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-grant-add-update',
  templateUrl: './grant-add-update.component.html',
  styleUrls: ['./grant-add-update.component.scss']
})
export class GrantAddUpdateComponent implements OnInit {
	title
  myDate = new Date();
	date = new FormControl(new Date());
  name=''
  desc=''
  serializedDate = new FormControl((new Date()).toISOString());
  id
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<GrantAddUpdateComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }
  fundingagency
  fagency
  sdate
  edate
  fesdate
  feedate
  ngOnInit() {
      this.fagency = this.data.fagency;
      this.fundingagency = this.data.data;
      this.sdate = this.myDate;
      this.edate= this.myDate;
      this.fesdate= this.myDate;
      this.feedate= this.myDate;


    if (this.data.x==0) {
      this.title = "Add Call for Proposals";
    }else{
      this.id= this.data.grants.id
      this.title = "Update Call for Proposals";
      this.fagency = this.data.fagency;
      this.fundingagency = this.data.data;
      this.sdate= new Date(this.data.grants.start);
      this.edate= new Date(this.data.grants.end);
      this.fesdate= new Date(this.data.grants.fesd);
      this.feedate= new Date(this.data.grants.feed);
      this.name=this.data.grants.name
      this.desc=this.data.grants.desc
      
    }

  }
 noclick()
	{
	  this.dialogRef.close(0)
	}
  addcallforproposal(wwwd){


          let current_datetime = this.sdate
          let formatted_date = (current_datetime.getMonth() + 1) +"-" + current_datetime.getDate() +  "-" + current_datetime.getFullYear()
          var sd = formatted_date.toString()
          current_datetime = this.edate
          formatted_date = (current_datetime.getMonth() + 1) +"-" + current_datetime.getDate() +  "-" + current_datetime.getFullYear()
          var ed = formatted_date.toString()
          current_datetime = this.fesdate
          formatted_date =  (current_datetime.getMonth() + 1) +"-" + current_datetime.getDate() +  "-" + current_datetime.getFullYear()
          var fesd = formatted_date.toString()
          current_datetime = this.feedate
          formatted_date =(current_datetime.getMonth() + 1) +"-" + current_datetime.getDate() +  "-" + current_datetime.getFullYear()
          var feed = formatted_date.toString()

          var x=''
          if (this.name=='') {
            x=x+"*Call for proposal name is required!<br>"
          }
          if (this.desc=='') {
            x=x+"*Description is required!<br>"
          }

          if (x=='') {
            if (this.data.x==1) {
                let urlSearchParams = new URLSearchParams();
                      urlSearchParams.append("name",this.name.toString());
                      urlSearchParams.append("id",this.name.toString());
                      urlSearchParams.append("desc",this.desc.toString());
                      urlSearchParams.append("sdate",sd);
                      urlSearchParams.append("edate",ed);
                      urlSearchParams.append("fesdate",fesd);
                      urlSearchParams.append("feedate",feed);
                      urlSearchParams.append("fagency",this.fagency.toString());
                    let body = urlSearchParams.toString()
                var header = new Headers();
                    header.append("Accept", "application/json");
                    header.append("Content-Type", "application/x-www-form-urlencoded");    
                    let option = new RequestOptions({ headers: header });
            this.global.swalLoading('');

             this.http.post(this.global.api + 'api.php?action=spCallForProposal_update',
             body,option)
                .map(response => response.json())
                .subscribe(res => { 
                  console.log(res)
                  this.dialogRef.close(1)
                  this.global.swalSuccess('Discipline has been Updated!')
               },Error=>{
                 console.log(Error)
                 this.global.swalAlertError()
               });
            }else{
                          let urlSearchParams = new URLSearchParams();
                                urlSearchParams.append("name",this.name.toString());
                                urlSearchParams.append("desc",this.desc.toString());
                                urlSearchParams.append("sdate",sd);
                                urlSearchParams.append("edate",ed);
                                urlSearchParams.append("fesdate",fesd);
                                urlSearchParams.append("feedate",feed);
                                urlSearchParams.append("fagency",this.fagency.toString());
                              let body = urlSearchParams.toString()
                          var header = new Headers();
                              header.append("Accept", "application/json");
                              header.append("Content-Type", "application/x-www-form-urlencoded");    
                              let option = new RequestOptions({ headers: header });
                      this.global.swalLoading('');

                       this.http.post(this.global.api + 'api.php?action=spCallForProposal_Insert',
                       body,option)
                          .map(response => response.json())
                          .subscribe(res => { 
                            console.log(res)
                            this.dialogRef.close(1)
                            this.global.swalSuccess('Call for proposals has been Added!')
                         },Error=>{
                           console.log(Error)
                           this.global.swalAlertError()
                         });
                        }
            // code...
          }else{
            this.global.swalAlert("Alert!", x,"warning")
          }
                
            }

  updatecallforproposal(){
        let current_datetime = this.sdate
        let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
        var sd = formatted_date.toString()
        current_datetime = this.edate
        formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
        var ed = formatted_date.toString()
        current_datetime = this.fesdate
        formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
        var fesd = formatted_date.toString()
        current_datetime = this.feedate
        formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
        var feed = formatted_date.toString()

        var x=''
        if (this.name=='') {
          x=x+"*Call for proposal name is required!<br>"
        }
        if (this.desc=='') {
          x=x+"*Description is required!<br>"
        }

        if (x=='') {
                let urlSearchParams = new URLSearchParams();
                      urlSearchParams.append("id",this.id.toString());
                      urlSearchParams.append("name",this.name.toString());
                      urlSearchParams.append("desc",this.desc.toString());
                      urlSearchParams.append("sdate",sd);
                      urlSearchParams.append("edate",ed);
                      urlSearchParams.append("fesdate",fesd);
                      urlSearchParams.append("feedate",feed);
                      urlSearchParams.append("fagency",this.fagency.toString());
                    let body = urlSearchParams.toString()
                var header = new Headers();
                    header.append("Accept", "application/json");
                    header.append("Content-Type", "application/x-www-form-urlencoded");    
                    let option = new RequestOptions({ headers: header });
            this.global.swalLoading('');

             this.http.post(this.global.api + 'api.php?action=spCallForProposal_update',
             body,option)
                .map(response => response.json())
                .subscribe(res => { 
                  console.log(res)
                  this.dialogRef.close(1)
                  this.global.swalSuccess('Call for proposals has been Updated!')
               },Error=>{
                 console.log(Error)
                 this.global.swalAlertError()
               });
        }else{
          this.global.swalAlert("Alert!", x,"warning")
        }
      
  }
}
