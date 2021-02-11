import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import { AddressLookupComponent } from './../../registration/address-lookup/address-lookup.component';

import Swal from 'sweetalert2';
const swal = Swal;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
    id='';

    email='';
    pword='';
    npword='';
    cpword='';

    mobileno = "+639";
    lname='';
    fname='';
    mname='';
    sname='';
    gender='';
    civilstatus='';
    citizenship='';
    telno='';

    psgc1; 
    psgc2; 

    perma='';
    resi='';
    street1=''
    street2=''
    company
    inputcompany='';

    height='';
    weight='';
    bloodtype='';
    gsis='';
    pagibig='';
    philhealth='';
    tin='';
    agencyno='';


   constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<EditProfileComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private http: Http,public global: GlobalService) {
	  this.email=this.global.requestemail();
    this.id = this.global.requestid();

    this.fname=this.data.user.fname
    this.lname=this.data.user.surname
    this.mname=this.data.user.mname
    this.sname=this.data.user.ext
    this.gender=this.data.user.sex
    this.civilstatus=this.data.user.civilstatus
    this.citizenship=this.data.user.citizenship
    this.telno=this.data.user.telno
    this.mobileno=this.data.user.mobileno

    this.psgc1 = this.data.user.psgc1
    this.psgc2 = this.data.user.psgc2

    this.street1 = this.data.user.street1
    this.street2 = this.data.user.street2

    this.height= this.data.user.height
    this.weight= this.data.user.weight
    this.bloodtype= this.data.user.bloodtype
    this.gsis= this.data.user.gsis
    this.pagibig= this.data.user.pagibig
    this.philhealth= this.data.user.philhealth
    this.tin= this.data.user.tin
    this.agencyno= this.data.user.agencyno



    this.http.get(this.global.api+'api.php?action=company_List')
    .map(response => response.json())
    .subscribe(res => {
     this.company = res
     this.inputcompany= this.data.company
    },Error=>{
      this.global.swalAlertError();
    });


    this.http.get(this.global.api+'api.php?action=spPSGC_Select2&psgc='+this.psgc1)
    .map(response => response.json())
    .subscribe(res => {
      if (res.length!=0) {
        this.perma = res[0].barangay + ", " +res[0].towncity + ", "+res[0].province + ", "+res[0].zip
      }
        },Error=>{
      this.global.swalAlertError();
    });

    this.http.get(this.global.api+'api.php?action=spPSGC_Select2&psgc='+this.psgc2)
    .map(response => response.json())
    .subscribe(res => {
      if (res.length!=0) {
       this.resi = res[0].barangay + ", " +res[0].towncity + ", "+res[0].province + ", "+res[0].zip
       }
    },Error=>{
      this.global.swalAlertError();
    });

	 }

  ngOnInit() {
  }

  onNoClickclose(): void {
       this.dialogRef.close(undefined);
  }
 openDialog(x): void {

    const dialogRef = this.dialog.open(AddressLookupComponent, {
      width: '500px', disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined) {
        if (result.result!='cancel') {
          if (x==1) {
            this.perma = result.result
            this.psgc1 = result.data
          }else{
            this.resi = result.result
            this.psgc2 = result.data
          }
        }
      }
    });
  }

  x=true;
  submit(){
    if (this.x==true) {
    this.x=false
             let urlSearchParams = new URLSearchParams();
                            urlSearchParams.append("id",this.id);
                            urlSearchParams.append("lname",this.lname);
                             urlSearchParams.append('fname', this.fname);
                             urlSearchParams.append('mname', this.mname);
                             urlSearchParams.append('sname', this.sname);
                             urlSearchParams.append('sex', this.gender);
                             urlSearchParams.append('civilstatus', this.civilstatus);
                             urlSearchParams.append('citizenship', this.citizenship);
                             urlSearchParams.append('resistreet', this.street2);
                             urlSearchParams.append('resi', this.psgc2);
                             urlSearchParams.append('permastreet', this.street1);
                             urlSearchParams.append('perma', this.psgc1);
                             urlSearchParams.append('telno', this.telno);
                             urlSearchParams.append('mobileno', this.mobileno);
                          let body = urlSearchParams.toString()
              var header = new Headers();
                          header.append("Accept", "application/json");
                          header.append("Content-Type", "application/x-www-form-urlencoded");    
                          let option = new RequestOptions({ headers: header });
              this.global.swalLoading('');

               this.http.post(this.global.api + 'api.php?action=spUser_PersonalInformation_InsertUpdate',
               body,option)
                  .map(response => response.text())
                  .subscribe(res => {
                        this.global.swalClose();
                        this.global.swalSuccess('Personal Information has been Updated!');
                        this.x=true;
                  },error => {
                    console.log(Error); 
                        this.global.swalAlertError();this.x=true;
                   } );
              }

  }
  submit2(){
    if (this.x==true) {
    this.x=false
             let urlSearchParams = new URLSearchParams();
                            urlSearchParams.append("id",this.id);
                            urlSearchParams.append("lname",this.lname);
                             urlSearchParams.append('fname', this.fname);
                             urlSearchParams.append('sex', this.gender);
                             urlSearchParams.append("height",this.height);
                             urlSearchParams.append('weight', this.weight);
                             urlSearchParams.append('bloodtype', this.bloodtype);
                             urlSearchParams.append('gsis', this.gsis);
                             urlSearchParams.append('pagibig', this.pagibig);
                             urlSearchParams.append('philhealth', this.philhealth);
                             urlSearchParams.append('tin', this.tin);
                             urlSearchParams.append('agencyno', this.agencyno);
                          let body = urlSearchParams.toString()
              var header = new Headers();
                          header.append("Accept", "application/json");
                          header.append("Content-Type", "application/x-www-form-urlencoded");    
                          let option = new RequestOptions({ headers: header });
              this.global.swalLoading('');

               this.http.post(this.global.api + 'api.php?action=spUser_PersonalInformation_InsertUpdate2',
               body,option)
                  .map(response => response.text())
                  .subscribe(res => {
                        this.global.swalClose();
                        this.global.swalSuccess('Personal Information has been Updated!');
                        this.x=true;
                      
                  },error => {
                    console.log(Error); 
                        this.global.swalAlertError();this.x=true;
                   } );
              }

  }
  submit3(){
    this.global.swalLoading('');
    if (this.x==true) {
      this.x=false

      var x='';
      if (this.email==''||this.company=='') {
         x = x+"*All Fields are required!<br>";
      }

      if (x=='') { 
           let urlSearchParams = new URLSearchParams();
              urlSearchParams.append("id",this.id);
              urlSearchParams.append("email",this.email);
               urlSearchParams.append('com', this.inputcompany);
            let body = urlSearchParams.toString()
            var header = new Headers();
                        header.append("Accept", "application/json");
                        header.append("Content-Type", "application/x-www-form-urlencoded");    
                        let option = new RequestOptions({ headers: header });

             this.http.post(this.global.api + 'api.php?action=spUser_Update',
             body,option)
                .map(response => response.text())
                .subscribe(res => {
                  this.global.setemail(this.email,this.id)
                  this.dialogRef.close(undefined);
                  this.global.swalClose();
                  this.global.swalSuccess('Credentials has been Updated!'); 
                } );
         }
          this.x=true; 
    }else
    {
        this.global.swalClose();
        this.x=true
    }

  }
}
