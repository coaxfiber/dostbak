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
  selector: 'app-user-role-management',
  templateUrl: './user-role-management.component.html',
  styleUrls: ['./user-role-management.component.scss']
})
export class UserRoleManagementComponent implements OnInit {

  
	roles
temparr=[]
dataSource;
pinfo
	displayedColumns = ['name','filter'];
      @ViewChild(MatSort,{static:false}) sort: MatSort;
       @ViewChild('paginator',{static:false}) paginator: MatPaginator;
  constructor(public dialogRef: MatDialogRef<UserRoleManagementComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { 
          this.pinfo = data.pinfo;
            this.http.get(this.global.api+'api.php?action=spUser_Role_List&id='+data.id,this.global.option)
                  .map(response => response.json())
                  .subscribe(res => {
                    this.temparr=res;
            },Error=>{
                //console.log(Error);
                console.log(Error)
              });
   }

  ngOnInit() {
        this.http.get(this.global.api+'api.php?action=spRole_List',this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.roles=res;
            this.dataSource = new MatTableDataSource(this.roles);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
		},Error=>{
		            //console.log(Error);
		            console.log(Error)
		          });
  }

check(role){
    let index = this.temparr.findIndex(e => e === role);
    if (index > -1) {
        return true
      // code...
    }else return false;
    //console.log(this.temparr[index].actions.some(e => e.id === accessId))
  }


  tempArray(role){
    let index = this.temparr.findIndex(e => e === role);
    if (index==-1)
      this.temparr.push(role);
    else      
      this.temparr.splice(index, 1);
    }

saveRole(){

    this.global.swalLoading('Updating Assigned Roles...');

            this.http.get(this.global.api + 'api.php?action=spUser_Role_Delete&uid='+this.data.id)
                .map(response => response.text())
                .subscribe(res => {
                      for (var i = 0; i < this.temparr.length; i++) {
                       this.http.get(this.global.api + 'api.php?action=spUser_Role_Insert&role='+this.temparr[i]+"&user="+this.data.id)
                          .map(response => response.text())
                          .subscribe(res => {
                          },error => {
                              console.log(Error); 
                                  this.global.swalAlertError();
                             });
                     }
                  this.dialogRef.close(0);
                  this.global.swalSuccess('User Role has been Saved!');

                },error => {
                    console.log(Error); 
                        this.global.swalAlertError();
                   });
}

applyFilter(filterValue: string) {
  this.dataSource.filterPredicate = (data:
  {name: string}, filterValue: string) =>
  data.name.trim().toLowerCase().indexOf(filterValue) !== -1;

    this.dataSource.filter = filterValue.trim().toLowerCase();
}
  onNoClick(): void {
    this.dialogRef.close(0);
  }

}
