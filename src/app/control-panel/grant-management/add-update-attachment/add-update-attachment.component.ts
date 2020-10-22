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
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-add-update-attachment',
  templateUrl: './add-update-attachment.component.html',
  styleUrls: ['./add-update-attachment.component.scss']
})
export class AddUpdateAttachmentComponent implements OnInit {
  
  form: FormGroup;
  loading: boolean = false;
  @ViewChild('fileInput',{static:false}) fileInput: ElementRef;
	title

	id=''
	name=''
	desc=''
	fagency=''
	fundingagency=[]
	majoralabel="Choose a file...";
  avatar
  constructor(private fb: FormBuilder,public dialog: MatDialog,public dialogRef: MatDialogRef<AddUpdateAttachmentComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }
  
  ngOnInit() {
      this.fagency = this.data.fagency;
      this.fundingagency = this.data.data;
  	if (this.data.x==0) {
      this.title = "Add Attachment Form";
    }else{
      this.id=this.data.attachment.id
      this.name=this.data.attachment.name
      this.desc=this.data.attachment.desc
      this.avatar=this.data.attachment.formdoc
      this.title = "Update Attachment Form";      
      this.filetype = this.data.attachment.fext;      
    }
    this.createForm()
  }
clearavatar(){
  this.avatar = null
}
 noclick()
  {
    this.dialogRef.close(0)
  }

 createForm() {
  }
  filename
  filetype
onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.avatar=reader.result.toString().split(',')[1]
        this.filename=file.name
        this.filetype=file.type
        if (this.avatar!=null) {
            this.majoralabel = file.name;
          }else{
            this.majoralabel = "Choose a file...";
          }
      };
    }
  }


  addcallattachment(){

      this.global.swalLoading('');
           var x = ''
            if (this.name == '') {
              x=x+"*Attachment name is required!<br>"
            }
            if (this.avatar == null) {
              x=x+"*Attachment file is required!<br>"
            }
            if (this.filetype=="docx"||this.filetype=="application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
              this.filetype="docx"
            }else if (this.filetype=="doc"||this.filetype=="application/msword") {
              this.filetype="doc"
            }else if (this.filetype=="pdf"||this.filetype=="application/pdf") {
              this.filetype="pdf"
            }else if (this.filetype=="xlsx"||this.filetype=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
              this.filetype="xlsx"
            }else if (this.filetype=="xls"||this.filetype=="application/vnd.ms-excel") {
              this.filetype="xls"
            }
            if (this.avatar != null) {
              if (this.filetype.length>5) { 
                x=x+"*Invalid File type.<br>the system only accepts (.docx),(.doc),(.pdf),(.xlsx),(.xls)"
              }
            }
            console.log(this.data.x)
          if (x=='') {
            if (this.data.x==0) {
                let urlSearchParams = new URLSearchParams();
                      urlSearchParams.append("fagency",this.fagency.toString());
                      urlSearchParams.append("name",this.name.toString());
                      urlSearchParams.append("desc",this.desc.toString());
                      urlSearchParams.append("formdoc",this.avatar);
                      urlSearchParams.append("fext",this.filetype);
                    let body = urlSearchParams.toString()
                var header = new Headers();
                    header.append("Accept", "application/json");
                    header.append("Content-Type", "application/x-www-form-urlencoded");    
                    let option = new RequestOptions({ headers: header });

             this.http.post(this.global.api + 'api.php?action=spAttachmentType_Insert',
             body,option)
                .map(response => response.text())
                .subscribe(res => { 
                  console.log(res)
                  this.dialogRef.close(1)
                  this.global.swalSuccess('Attachment Form has been Updated!')
               },Error=>{
                 console.log(Error)
                 this.global.swalAlertError()
               });
            }
            else{
                let urlSearchParams = new URLSearchParams();
                      urlSearchParams.append("id",this.id.toString());
                      urlSearchParams.append("name",this.name.toString());
                      urlSearchParams.append("desc",this.desc.toString());
                      urlSearchParams.append("formdoc",this.avatar);
                      urlSearchParams.append("fext",this.filetype);
                    let body = urlSearchParams.toString()
                var header = new Headers();
                    header.append("Accept", "application/json");
                    header.append("Content-Type", "application/x-www-form-urlencoded");    
                    let option = new RequestOptions({ headers: header });

             this.http.post(this.global.api + 'api.php?action=spAttachmentType_Update',
             body,option)
                .map(response => response.text())
                .subscribe(res => { 
                  console.log(res)
                  this.dialogRef.close(1)
                  this.global.swalSuccess('Attachment Form has been Updated!')
               },Error=>{
                 console.log(Error)
                 this.global.swalAlertError()
               });
            }
          }else
          {
            this.global.swalAlert("Warning",x,'warning')
          }
        }
}
