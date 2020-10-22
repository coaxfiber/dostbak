import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { GlobalService } from './../../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {
  see=0;
  roles:any;desc
  role:string='';
  access:any;
  temparr:any;
  constructor(public dialogRef: MatDialogRef<RoleAddComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { 
    
   }
  saveRole(){
  	if (this.role!='') {var header = new Headers();
        let urlSearchParams2 = new URLSearchParams();
                urlSearchParams2.append("role",this.role);
                 urlSearchParams2.append('desc', this.desc);
              let body2 = urlSearchParams2.toString()
              var header = new Headers();
                    header.append("Accept", "application/pdf");
                    header.append("Content-Type", "application/x-www-form-urlencoded");    
                    let option2 = new RequestOptions({ headers: header });
    this.global.swalLoading('Saving Role...');
  		this.http.post(this.global.api+'api.php?action=spRole_Insert' ,body2,option2)
              .map(response => response.text())
              .subscribe(res => {
                this.global.swalSuccess('Role has been saved!');
                this.see=1;
                this.role='';
                this.desc='';
                //this.global.swalAlert(res.message,'','success');
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error);
              });
  	}else{
       this.global.swalAlert("Role must not be empty!",'','warning')
    }
   }
  ngOnInit() {
  }
  onNoClick(): void {
       this.dialogRef.close(this.see);
  }
}
