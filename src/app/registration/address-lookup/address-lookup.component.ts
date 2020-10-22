import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-address-lookup',
  templateUrl: './address-lookup.component.html',
  styleUrls: ['./address-lookup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddressLookupComponent implements OnInit {
	provinces
	towncity
	barangay

	prov=''
	town=''
	bar=''
	bara=''
	zip
  constructor(public dialogRef: MatDialogRef<AddressLookupComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private http: Http,public global: GlobalService) {
	
	this.http.get(this.global.api+'api.php?action=spProvince_Select',this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	   this.provinces = res
	  },Error=>{
	    this.global.swalAlertError();
	  });

  }

  gettowncity(province){
	this.town = '';
	this.bar= '';
	this.http.get(this.global.api+'api.php?action=spTown_Select&province='+province,this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	   this.towncity = res
	  },Error=>{
	    this.global.swalAlertError();
	  });
  }

  getbarangay(province,town){
	this.bar = '';
	this.http.get(this.global.api+'api.php?action=spPSGC_Select&province='+province+'&town='+town,this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	   this.barangay = res
	  },Error=>{
	    this.global.swalAlertError();
	  });
  }


  onNoClick(): void {
  	var x='';
  	if (this.prov=='')
  		x=x+"*Provice is Required.\n"
  	if (this.town=='')
  		x=x+"*Town/City is Required.\n"
  	if (this.bar=='')
  		x=x+"*Barangay is Required."

  	if (x=='') {
       this.dialogRef.close({result:this.bara +", "+ this.town+", "+this.prov +' '+this.zip,data:this.bar});
  	}else{
  		alert(x)
  	}

  }
  onNoClickclose(): void {
       this.dialogRef.close({result:'cancel',data:this.bar});
  }
  see(z,x){
  	this.bara = z;
  	this.zip = x
  }
  ngOnInit() {
  }

}
