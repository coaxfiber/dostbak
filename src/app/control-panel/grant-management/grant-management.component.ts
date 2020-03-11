import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewChild,ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AddUpdateAttachmentComponent } from './add-update-attachment/add-update-attachment.component';
import Swal from 'sweetalert2';
import { GrantAddUpdateComponent } from './grant-add-update/grant-add-update.component';
const swal = Swal;
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';

@Component({
  selector: 'app-grant-management',
  templateUrl: './grant-management.component.html',
  styleUrls: ['./grant-management.component.scss']
})
export class GrantManagementComponent implements OnInit {
fundingagency
grants=null
fagency=''
original=[]
attachment=null
  constructor(public dialog: MatDialog,private global: GlobalService,private http: Http) { }
  ngOnInit() {
  	 
  }
  createtable(x){
    this.grants=undefined;
       this.http.get(this.global.api+'api.php?action=spCallForProposal_Select&id='+x,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.original=res
             this.grants = res;
            this.applyFilter()
            this.createtable2(x)
          },Error=>{
           this.global.swalAlertError();
           console.log(Error)
      });
  }
  createtable2(x){
    this.attachment=undefined;
       this.http.get(this.global.api+'api.php?action=spAttachmentType_Select&id='+x,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            console.log(res)
            this.attachment=res
          },Error=>{
           this.global.swalAlertError();
           console.log(Error)
      });
  }

  search=''
  applyFilter(){
    this.grants=[]
    for (var i = 0; i < this.original.length; ++i) {
      if (this.original[i].name.toLowerCase().includes(this.search.toLowerCase())) {
        this.grants.push(this.original[i])
      }
    }
  }

  openDialog(x,data): void {
    const dialogRef = this.dialog.open(GrantAddUpdateComponent, {
      width: '500px',data:{ x: x,data:this.global.fundingagency,fagency:this.fagency,grants:data }, disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result!=undefined) {
        if (result==1) {
          this.createtable(this.fagency);
        }
      }
    });
  }
  openDialogattachmentent(x,data): void {
    const dialogRef = this.dialog.open(AddUpdateAttachmentComponent, {
      width: '500px',data:{ x: x,data:this.global.fundingagency,fagency:this.fagency,attachment:data }, disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result!=undefined) {
        if (result==1) {
          this.createtable(this.fagency);
        }
      }
    });
  }

  removegrant(id){
    this.swalConfirm("Delete Call for Proposal?","You won't be able to revert this!",'warning','Yes',' Call for Proposal has been Removed','','delete',id);
  }
  removeattachment(id){
    this.swalConfirm("Delete Attachment Form?","You won't be able to revert this!",'warning','Yes',' Attachment Form has been Removed','','deleteattachment',id);
  }
	addtitle


  swalConfirm(title,text,type,button,d1,d2,remove,id)
  {
    swal({
        title: title,
        type: type,
        html:text,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: button
      }).then((result) => {
        if (result.value) {
          if (remove=='delete') {
            this.global.swalLoading("");
            this.http.get(this.global.api+'api.php?action=spCallForProposal_Delete&id='+id)
              .map(response => response.text())
              .subscribe(res => {
                this.createtable(this.fagency);
                this.global.swalSuccess(" Call for Proposal has been Permanently Deleted!")
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
          }
          if (remove=='deleteattachment') {
            this.global.swalLoading("");
            this.http.get(this.global.api+'api.php?action=spAttachmentType_Delete&id='+id)
              .map(response => response.text())
              .subscribe(res => {
                this.createtable(this.fagency);
                this.global.swalSuccess("Attachment Form has been Permanently Deleted!")
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
          }
        }
      })
  }
  filetype=''
  filetype2=''
  dl(filetype,file){
    var filetype2
            if (filetype=="docx") {
              filetype2="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            }else if (filetype=="doc") {
              filetype2="application/msword"
            }else if (filetype=="pdf") {
              filetype2="application/pdf"
            }else if (filetype=="xlsx") {
              filetype2="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }else if (filetype=="xls") {
              filetype2="application/vnd.ms-excel"
            }
    var blob = new Blob([file], { type: filetype2 });
    if (window.navigator.msSaveBlob) { // // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
        window.navigator.msSaveOrOpenBlob(blob, 'exportData' + new Date().toDateString() + '.'+filetype);
    }
    else {
        var a = window.document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = "exportData" + new Date().toDateString() + "."+filetype;
        document.body.appendChild(a);
        a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
        document.body.removeChild(a);
    }
  }

  dlfiletype(filetype){
    var filetype2
            if (filetype=="docx") {
              filetype2="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            }else if (filetype=="doc") {
              filetype2="application/msword"
            }else if (filetype=="pdf") {
              filetype2="application/pdf"
            }else if (filetype=="xlsx") {
              filetype2="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }else if (filetype=="xls") {
              filetype2="application/vnd.ms-excel"
            }
    return filetype2
  }
}