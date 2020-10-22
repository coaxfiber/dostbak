import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewChild,ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { UserRoleManagementComponent } from './user-role-management/user-role-management.component';

import { UserLookupComponent } from './user-lookup/user-lookup.component';
@Component({
  selector: 'app-assign-user-roles',
  templateUrl: './assign-user-roles.component.html',
  styleUrls: ['./assign-user-roles.component.scss']
})
export class AssignUserRolesComponent implements OnInit {
	name;
	image;
	email
	company

	pinfo
  constructor(public dialog: MatDialog,public global: GlobalService,private http: Http) { }

  ngOnInit() {
       
  }

  openDialogManageRole(): void {

    const dialogRef = this.dialog.open(UserRoleManagementComponent, {
      width: '700px',data:{pinfo:this.pinfo, company:this.company,id:this.pinfo.id,image:this.image}, disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogUserLookUp(): void {

    const dialogRef = this.dialog.open(UserLookupComponent, {
      width: '700px', disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
    	if (result!=undefined) {
    		if (result!=0) {
    			this.email = result
          this.keyDownFunction('onoutfocus')
    		}
    	}
    });
  }

  keyDownFunction(event){

  if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
		  	this.http.get(this.global.api+'api.php?action=spUser_PersonalInformation_Get&email='+this.email,this.global.option)
		          .map(response => response.json())
		          .subscribe(res => {
		          	if (res.id==null) {
          				this.global.swalAlert("No user is associated with "+this.email,"",'warning');
          				this.pinfo=undefined;
          				this.image=undefined
		          	}else{

		            this.pinfo=res;
			               this.http.get(this.global.api + 'api.php?action=spUserViewDomain_Company_By_Username&email='+this.email,
			                   this.global.option)
			                      .map(response => response.json())
			                      .subscribe(res => {
			                      this.company=res[0].companyname
			                  });
		          	}
		          },Error=>{
		            //console.log(Error);
		            console.log(Error)
		          });
	  }
	}
}
