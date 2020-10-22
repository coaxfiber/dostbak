import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../../global.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; 
import { MatStepper,MatDialog,MatDialogRef } from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import Swal from 'sweetalert2';

import { ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import { ProposalDocumentComponent } from './../../proposals/proposal-document/proposal-document.component';
import { StatusChangeProposalComponent } from './../status-change-proposal/status-change-proposal.component';

const swal = Swal;
@Component({
  selector: 'app-view-proposal-details',
  templateUrl: './view-proposal-details.component.html',
  styleUrls: ['./view-proposal-details.component.scss']
})
export class ViewProposalDetailsComponent implements OnInit {
form: FormGroup;
  loading: boolean = false;
  @ViewChild('fileInput',{static:false}) fileInput: ElementRef;

  form2: FormGroup;
  loading2: boolean = false;
  @ViewChild('fileInput2',{static:false}) fileInput2: ElementRef;

company;
degreelevel

inputcompany
inputtitle;
inputabstract;
inputdegreelevel

researchid

author
authorid
authorsarray
authorsarrayinresearch

keyword
keywordarray

maindoclabel='Choose a file...'
supdoclabel="Choose a file..."

discipline
inputdiscipline
disciplinearrayinresearch

fundingagency
inputfundingagency
fundingagencyarrayinresearch

documentarray

counter=2;

 createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      avatar: null
    });
    this.form2 = this.fb.group({
      name: ['', Validators.required],
      avatar: null
    });
  }
  constructor(public dialogRef: MatDialogRef<ViewProposalDetailsComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog, private fb: FormBuilder, private router: Router,public global: GlobalService,private http: Http) {
  
  	console.log(data.x)


  }
  onNoClickclose(): void {
       this.dialogRef.close(undefined);
  }
  approve(type){
    const dialogRef = this.dialog.open(StatusChangeProposalComponent, {
      width: '50%',data:{title:this.data.x.GeneralTitle,id:this.data.x.id,type:type}, disableClose: false });

    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined) { 
        if (result==1) {
          this.dialogRef.close(1);
          // code...
        }
      }
    });
  }
    Viewpdf(id){
    var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });
        this.http.get(this.global.api + 'api.php?action=spResearchDocument_Select&rid='+id+"&type=0",
           option)
              .map(response => response.json())
              .subscribe(res => {
                if(res[0].id!=null){

                const dialogRef = this.dialog.open(ProposalDocumentComponent, {
                      width: '90%',data:{pdf: id}, disableClose: true });

                    dialogRef.afterClosed().subscribe(result => {
                      if (result==1) { 
                      }
                    });
                }else{
                  this.global.swalAlert('No main Document','','warning')
                }
            });
  }
 getkeyword(rid){
  var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });
        this.http.get(this.global.api + 'api.php?action=spResearchKeyword_Select&rid='+rid,
           option)
              .map(response => response.json())
              .subscribe(res => {
                this.keywordarray= res;
          });


  }
  ngOnInit() {
    //this.createForm()
  }


pubtitle;
pubvolume;
pubissue;
pubyear;
pubpublisher;
publicationarray

  getpubinfo(rid){
        this.http.get(this.global.api + 'api.php?action=spResearchPublicationDetails_Select&rid='+rid)
              .map(response => response.json())
              .subscribe(res => {
                  this.publicationarray = res;
                   this.pubtitle='';
                  this.pubvolume='';
                  this.pubissue='';
                  this.pubyear='';
                  this.pubpublisher=''; 
            });
  }

  removepubinfo(id){                                               
      this.http.get(this.global.api + 'api.php?action=spResearchPublicationDetails_Delete&id='+id)
            .map(response => response.json())
            .subscribe(res => {
             this.getpubinfo(this.researchid);
        },error => {
                this.global.swalAlertError();
           } );
  }




  getdocument(rid){
  var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });
        this.http.get(this.global.api + 'api.php?action=spResearchDocument_Select&rid='+rid+"&type=1",
           option)
              .map(response => response.json())
              .subscribe(res => {
                this.documentarray = res;    
            });
  }

  getfundingagency(rid){
  var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });
        this.http.get(this.global.api + 'api.php?action=spResearchFundingAgency_Select&rid='+rid,
           option)
              .map(response => response.json())
              .subscribe(res => {
                this.fundingagencyarrayinresearch= res;
                this.getfundingagencyselect(this.researchid)
             this.global.swalClose();
          });


  }

  getauthor(rid){
  var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });
        this.http.get(this.global.api + 'api.php?action=spResearchAuthor_Select&rid='+rid,
           option)
              .map(response => response.json())
              .subscribe(res => {
                this.authorsarrayinresearch= res;
          });


  }


  getdiscipline(rid){
  var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });
        this.http.get(this.global.api + 'api.php?action=spResearchProgramDiscipline_Select&rid='+rid,
           option)
              .map(response => response.json())
              .subscribe(res => {
                this.disciplinearrayinresearch= res;
          });


  }

  getdisciplineselect(rid){
  var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });
        this.http.get(this.global.api + 'api.php?action=spProgramDiscipline_Select_NotIn&rid='+rid,
           option)
              .map(response => response.json())
              .subscribe(res => {
                this.discipline = res;
          });


  }
  getfundingagencyselect(rid){
  var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });
        this.http.get(this.global.api + 'api.php?action=spFundingAgency_Select_NotIn&rid='+rid,
           option)
              .map(response => response.json())
              .subscribe(res => {
                this.fundingagency = res;
          });
  }

}
