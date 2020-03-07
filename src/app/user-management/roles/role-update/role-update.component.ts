import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { GlobalService } from './../../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ViewChild,ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss']
})
export class RoleUpdateComponent implements OnInit {
  roles:any;
  role:string;

  see=0;

  access:any;
  temparr:any;
	desc
	id
  enabled=false;apparray=[];
dataSource;
  displayedColumns = ['name','filter'];
      @ViewChild(MatSort,{static:false}) sort: MatSort;
       @ViewChild('paginator',{static:false}) paginator: MatPaginator;
       
inputcompany
appid
comid

disabled=false
  constructor(public dialogRef: MatDialogRef<RoleUpdateComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { 
   this.role = data.role;
   this.desc = data.desc;
   this.id = data.id;
   if (data.id==1||data.id==2) {
     this.disabled=true
   }
     this.http.get(this.global.api+'api.php?action=spApplication_Module_List',this.global.option)
	       .map(response => response.json())
	      .subscribe(res => {
	        this.access = res;
            this.dataSource = new MatTableDataSource(this.access);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
                this.http.get(this.global.api+'api.php?action=spRoleRight_List&roleid='+this.id,this.global.option)
                   .map(response => response.json())
                  .subscribe(res => {
                    this.apparray=res;
                    this.global.swalClose();
                });


                this.http.get(this.global.api+'api.php?action=spRole_RoleApplication_Select&id='+this.id,this.global.option)
                   .map(response => response.json())
                  .subscribe(res => {
                    this.appid=res.id;
                     this.http.get(this.global.api+'api.php?action=spUser_ViewDomain_Company_Select_by_Role&id='+res.id,this.global.option)
                         .map(response => response.json())
                        .subscribe(res => {
                          this.comid=res.id
                          this.inputcompany = res.companyid;
                          this.global.swalClose();
                      });
                    this.global.swalClose();
                });


	    }
	       ,Error=>{
	        this.global.swalAlertError();
	      });
  }

  putArray(res){

  }

  checked(search){
    
        for( var i = 0; i < this.apparray.length; i++){ 
               if ( this.apparray[i] === search.toString()) {
                 return true
               }
             }
             return false
    //console.log(this.temparr[index].actions.some(e => e.id === accessId))
  }

  checkbox(event,id){
    if (event.checked==true) {
           this.apparray.push(id);
      }else{
        for( var i = 0; i < this.apparray.length; i++){ 
               if ( this.apparray[i] === id) {
                 this.apparray.splice(i, 1); 
                }
        
      }
    }

  }


  saveRole(){
    if (this.role!='') {
     let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("role",this.role);
                     urlSearchParams.append('desc', this.desc);
                     urlSearchParams.append('id', this.id ); 
                  let body = urlSearchParams.toString()
      var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Content-Type", "application/x-www-form-urlencoded");    
                  let option = new RequestOptions({ headers: header });
      this.global.swalLoading('');

       this.http.post(this.global.api + 'api.php?action=spRole_Update',
       body,option)
          .map(response => response.json())
          .subscribe(res => {

            this.http.get(this.global.api + 'api.php?action=spRoleRight_Delete&roleid='+this.id)
                .map(response => response.text())
                .subscribe(res => {
                      for (var i = 0; i < this.apparray.length; i++) {
                       this.http.get(this.global.api + 'api.php?action=spRoleRight_Insert&app='+this.apparray[i]+"&role="+this.id)
                          .map(response => response.text())
                          .subscribe(res => {
                          },error => {
                              console.log(Error); 
                                  this.global.swalAlertError();
                             });
                     }
                     if (this.inputcompany=='') {
                       this.http.get(this.global.api+'api.php?action=spUser_ViewDomain_Company_Delete&id='+this.comid,this.global.option)
                           .map(response => response.text())
                          .subscribe(res => {
                        });
                       
                     }else 
                     this.http.get(this.global.api+'api.php?action=spUser_ViewDomain_Company_Insert&id='+this.appid+"&cid="+this.inputcompany,this.global.option)
                         .map(response => response.text())
                        .subscribe(res => {
                      });
                  this.global.swalSuccess('Role has Updated!');

                  this.dialogRef.close(1);
                },error => {
                    console.log(Error); 
                        this.global.swalAlertError();
                   });
       
          },error => {
            console.log(Error); 
                this.global.swalAlertError();
           } );

    }else{
       this.global.swalAlert("Role must not be empty!",'','warning')
    }
  }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close(0);
  }

}
