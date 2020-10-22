import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
	pword=''
	npword=''
	cpword=''
	x=true
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<ChangePasswordComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http,) { }

  ngOnInit() {
  }
  onNoClickclose(): void {
       this.dialogRef.close(undefined);
  }
submit3(){
    this.global.swalLoading('');
    if (this.x==true) {
      this.x=false

      var x='';
      if (this.pword==''||this.npword==""||this.cpword=='') {
         x = x+"*All Fields are required!<br>";
      }
      if (this.npword != this.cpword) {
         x = x+"*New password and confirm password does no match!<br>";
      }
      if (this.npword.length < 6) {
         x = x+"*New Password must be at least 6 Characters!<br>";
      }


      if (x=='') { 
           let urlSearchParams = new URLSearchParams();
                            urlSearchParams.append("id",this.global.requestid());
                            urlSearchParams.append("oldp",this.pword);
                             urlSearchParams.append('np', this.npword);
                          let body = urlSearchParams.toString()
              var header = new Headers();
                          header.append("Accept", "application/json");
                          header.append("Content-Type", "application/x-www-form-urlencoded");    
                          let option = new RequestOptions({ headers: header });

               this.http.post(this.global.api + 'api.php?action=spUser_ChangePassword',
               body,option)
                  .map(response => response.json())
                  .subscribe(res => {
                       if (res[0]=='0') {
                         x =  x+"*Incorrect Old password!<br>";
        				this.global.swalAlert('',x,'warning');
                       }else{
       					this.dialogRef.close(undefined);
                       	this.global.swalSuccess('Password Changed')
                       }
                        this.x=true; 
                    
                  },error => {
                    console.log(Error); 
                        this.global.swalAlertError();
                        this.x=true; 
                   } );

      }else{
        this.x=true

      }
    }else
    {
        this.global.swalClose();
        this.x=true
    }

  }
}
