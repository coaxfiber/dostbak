import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
const swal = Swal;
import { GlobalService } from './../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AddressLookupComponent } from './address-lookup/address-lookup.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
	email='';
	pword='';
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
  constructor(public dialog: MatDialog,public global: GlobalService,private http: Http,private router: Router) {
  	this.email = "";
  	this.pword = "";
  	this.cpword = "";
  	this.http.get(this.global.api+'api.php?action=company_List',this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	   this.company = res
	  },Error=>{
	    this.global.swalAlertError();
	  });
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
	    			this.checkthis2();
	    		}else{
	    			this.resi = result.result
	    			this.psgc2 = result.data
	    		}
	    	}
    	}
    });
  }
 goBack() {
  window.history.back();
}
  nexttopinfo(stepper){
  	if (this.email!=''&&this.pword!=''&&this.cpword!=''&&this.inputcompany!='') {
  		if (this.validateEmail(this.email)) {
  			if (this.pword.length<6) {
		       swal(
		          '',
		           'Password must be at least 6 characters!',
		           'info'
		          )
  			}else{
	  			 if (this.pword!=this.cpword) {
			       swal(
			          '',
			           'Passwords does not match!',
			           'info'
			          )
	  			}else
	  			stepper.next();
  			}
  		}else
  		{
	       swal(
	          '',
	           'Please enter a valid email address!',
	           'info'
	          )
  		}
  	}else
  		{
	       swal(
	          '',
	           'All fields are required!',
	           'info'
	          )
  		}
  }

  ngOnInit() {
  }


	validateEmail(email) {
	  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return re.test(email);
	}

	check=false;
	checkbox(){

	    	this.check=true;
	    	this.resi = this.perma;
	    	this.psgc2= this.psgc1;
	    	this.street2 = this.street1;
    	
  }
  checkthis(){
	 this.check=false;
  }
  checkthis2(){
	 this.check=true;
  }

  nexttosubmit(stepper){
  	var x='';
  	if (this.lname=='') {
  		x=x+"*Last name is required!<br>";
  	}
  	if (this.fname=='') {
  		x=x+"*First name is required!<br>";
  	}
  	if (this.gender=='') {
  		x=x+"*Gender is required!<br>";
  	}
  	if (this.civilstatus=='') {
  		x=x+"*Civil Status is required!<br>";
  	}
  	if (this.citizenship=='') {
  		x=x+"*Citizenship is required!<br>";
  	}
  	if (this.perma=='') {
  		x=x+"*Permanent Address is required!<br>";
  	}
  	if (this.resi=='') {
  		x=x+"*Residential Address is required!<br>";
  	}
  	if (this.street1=='') {
  		x=x+"*Street in permanent address is required!<br>";
  	}
  	if (this.street2=='') {
  		x=x+"*Street in residential address is required!<br>";
  	}

  	if (x=='') {
  		stepper.next();
  	}else
  		swal(
	          '',
	           x,
	           'info'
	          )
  }
  x=true;
  submit(){
  	console.log(this.x)
  	if (this.x==true) {
  	this.x=false
  	 let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("email",this.email.toString());
                    urlSearchParams.append("password",this.pword.toString());
                     urlSearchParams.append('company', this.inputcompany.toString());
                  let body = urlSearchParams.toString()
      var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Content-Type", "application/x-www-form-urlencoded");    
                  let option = new RequestOptions({ headers: header });
      this.global.swalLoading('');

       this.http.post(this.global.api + 'api.php?action=spUser_Insert',
       body,option)
          .map(response => response.json())
          .subscribe(res => {
          		if (res.id==null) {
			       swal(
			           'Email already in use!',
			           'If the email address is still not working for you, please get in touch with us and we will look into it further!',
			           'info'
			          )
          		}else{
				  	 let urlSearchParams = new URLSearchParams();
				                    urlSearchParams.append("id",res.id);
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
				       this.http.post(this.global.api + 'api.php?action=spUser_PersonalInformation_InsertUpdate',
				       body,option)
				          .map(response => response.text())
				          .subscribe(res => {
                				this.global.swalClose();
                				this.global.swalSuccess('Account has been Registered!');

                				this.router.navigate(['login']);
				          },error => {
				            console.log(Error); 
				                this.global.swalAlertError();
				           } );
          		}

          },error => {
            console.log(Error); 
                this.global.swalAlertError();
           } );
		  	}
  }

}
