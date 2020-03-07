import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewChild,ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { GlobalService } from './../../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-user-lookup',
  templateUrl: './user-lookup.component.html',
  styleUrls: ['./user-lookup.component.scss']
})
export class UserLookupComponent implements OnInit {
	userarray=[]
	temparr
	email=''
  constructor(public dialogRef: MatDialogRef<UserLookupComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private global: GlobalService,private http: Http) {  }

  ngOnInit() {
  	this.userarray=undefined
  	this.http.get(this.global.api+'api.php?action=spUser_List',this.global.option)
                  .map(response => response.json())
                  .subscribe(res => {
                  	this.userarray=[]
                    this.userarray=res;
                    this.temparr=res
                    console.log(res)
            },Error=>{
                //console.log(Error);
                console.log(Error)
              });
  }

  onNoClick(): void {
    this.dialogRef.close(0);
  }
  select(x){
    this.dialogRef.close(x);
  }


  keyDownFunction(event){

  if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
  	this.userarray=[]
	  	 	console.log(this.temparr)
	  	 	var name
	  	 for (var i = 0; i < this.temparr.length; ++i) {
	  	 	name = this.temparr[i].fname + " "+ this.temparr[i].mname+ " "+ this.temparr[i].lname+ " "+ this.temparr[i].suffix
	  	 	if (name.includes(this.email)||this.temparr[i].email.includes(this.email)) {
	  	 		this.userarray.push(this.temparr[i])
	  	 	}
	  	 }
        }
	  }


}
