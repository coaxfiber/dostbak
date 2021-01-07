import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../global.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; 
import { MatStepper,MatDialog,MatDialogRef } from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import Swal from 'sweetalert2';
import { ManageAuthorComponent } from './manage-author/manage-author.component';

import { Inject} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material';

import { ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
const swal = Swal;

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-new-research',
  templateUrl: './new-research.component.html',
  styleUrls: ['./new-research.component.scss']
})
export class NewResearchComponent implements OnInit {
 
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


maindoclabel='Choose a file...'
supdoclabel="Choose a file..."

discipline
inputdiscipline
disciplinearrayinresearch

fundingagency
inputfundingagency
fundingagencyarrayinresearch

documentarray

counter=1;

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

  keywordarray

  myControl = new FormControl();
  options = [];
  authoridoptions=[]
  authorname=''
  filteredOptions: Observable<string[]>;


  myControl2 = new FormControl();
  options2 = [];
  keyword=''
  filteredOptions2: Observable<string[]>;

  page=''
  place=''

  constructor(public dialogRef: MatDialogRef<NewResearchComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog, private fb: FormBuilder, private router: Router,public global: GlobalService,private http: Http) {
  	this.http.get(this.global.api + 'api.php?action=company_List',
         this.global.option)
            .map(response => response.json())
            .subscribe(res => {
              this.company= res;
        });



    this.http.get(this.global.api + 'api.php?action=degreelevel',
         this.global.option)
            .map(response => response.json())
            .subscribe(res => {
              this.degreelevel = res;
        });
   
    this.inputcompany = this.global.useraccess.companyid;

  }

  getkeywordselect(){
  var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });
        this.http.get(this.global.api + 'api.php?action=spKeyword_List',
           option)
              .map(response => response.json())
              .subscribe(res => {
                this.options2= res;
                console.log(res)
                this.filteredOptions2 = this.myControl2.valueChanges
                  .pipe(
                    startWith(''),
                    map(value => this._filter2(value))
                  );
             this.global.swalClose();
          });


  }
selectauthor(i){
  this.author=this.authoridoptions[i]
}
getauthorselect(){
    this.http.get(this.global.api + 'api.php?action=spAuthor_listnot&cid='+this.global.useraccess.companyid+'&rid='+this.researchid,
                   this.global.option)
                      .map(response => response.json())
                      .subscribe(res => {
                        this.authorsarray =res
                        this.authoridoptions = []
                        this.options = []
                        for (var i = 0; i < res.length; ++i) {
                          this.options.push(res[i].name)
                          this.authoridoptions.push(res[i].id)
                        }

                        this.filteredOptions = this.myControl.valueChanges
                          .pipe(
                            startWith(''),
                            map(value => this._filter(value))
                          );
                        
                  });
}
onFileChange(event) {

    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.toString().split(',')[1]
        })
        if (this.form.value.avatar!=null) {
            this.maindoclabel = file.name;
          }else{
            this.maindoclabel = "Choose a file";
          }
      };
    }

  }

onFileChange2(event) {

    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form2.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.toString().split(',')[1]
        })
        if (this.form2.value.avatar!=null) {
            this.supdoclabel = file.name;
          }else{
            this.supdoclabel = "Choose a file";
          }
      };
    }

  }

  clearFile2() {

    //this.form.value.avatar.value);
    this.supdoclabel = "Choose a file...";
    this.form2.get('avatar').setValue(null);
    this.fileInput2.nativeElement.value = '';
  }

  clearFile() {
    
    console.log(this.form.value.avatar.value)
    //this.form.value.avatar.filetype);
    //this.form.value.avatar.value);

    this.maindoclabel = "Choose a file...";
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }


  ngOnInit() {
    this.createForm()
    this.getauthorselect()
    this.getkeywordselect()
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options2.filter(option => option.toLowerCase().includes(filterValue));
  }

pubtitle;
pubvolume;
pubissue;
pubyear;
pubpublisher;
publicationarray
insertpublicationinfo(){
let x='';
    if (this.pubtitle==undefined||this.pubtitle=='') {
      x=x+"*Publication Title is required\n";
    }
    if (this.pubvolume==undefined||this.pubvolume=='') {
      x=x+"*Publication Volume is required\n";
    }
    if (this.pubissue==undefined||this.pubissue=='') {
      x=x+"*Publication Issue is required\n";
    }
    if (this.pubyear==undefined||this.pubyear=='') {
      x=x+"*Publication Year is required\n";
    }
    if (this.pubpublisher==undefined||this.pubpublisher=='') {
      x=x+"*Publisher is required\n";
    }
    if (this.page=='') {
      x=x+"*Page is required\n";
    }
    if (this.place=='') {
      x=x+"*Place of publication is required\n";
    }

    if (x=='') {
     let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("rid",this.researchid.toString());
                    urlSearchParams.append("pubtitle",this.pubtitle.toString());
                     urlSearchParams.append('pubvolume', this.pubvolume.toString());
                     urlSearchParams.append('pubissue', this.pubissue.toString());
                     urlSearchParams.append('pubyear', this.pubyear.toString() );  
                     urlSearchParams.append('pubpublisher', this.pubpublisher.toString() );  
                     urlSearchParams.append('page', this.page.toString() );  
                     urlSearchParams.append('place', this.place.toString() );  
                  let body = urlSearchParams.toString()
      var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Content-Type", "application/x-www-form-urlencoded");    
                  let option = new RequestOptions({ headers: header });
      this.global.swalLoading('');

       this.http.post(this.global.api + 'api.php?action=spResearchPublicationDetails_Insert',
       body,option)
          .map(response => response.json())
          .subscribe(res => {
             this.getpubinfo(this.researchid);  
                this.global.swalClose();
          },error => {
            console.log(Error); 
                this.global.swalAlertError();
           } );
        }else
          alert(x)
  }

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



insertdocument(){
let x='';
    if (this.supdoclabel=='Choose a file...') {
      x=x+"*Supporting document is required\n";
    }

    if (x=='') {
     let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("rid",this.researchid.toString());
                     urlSearchParams.append('name', this.form2.value.avatar.filename );
                     urlSearchParams.append('doc', this.form2.value.avatar.value);
                     urlSearchParams.append('type', '1' );  
                     urlSearchParams.append('status', '0' );  
                  let body = urlSearchParams.toString()
      var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Content-Type", "application/x-www-form-urlencoded");    
                  let option = new RequestOptions({ headers: header });
      this.global.swalLoading('');

       this.http.post(this.global.api + 'api.php?action=spResearchDocument_Insert',
       body,option)
          .map(response => response.json())
          .subscribe(res => {
             this.getdocument(this.researchid);  
                this.global.swalClose();
          },error => {
            console.log(Error); 
                this.global.swalAlertError();
           } );
        }else
          alert(x)
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
                 this.clearFile2();      
            });
  }

  removedocument(id){                                                                   
    var header = new Headers();
      header.append("Accept", "application/json");
      header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      this.http.get(this.global.api + 'api.php?action=spResearchDocument_Delete&id='+id,
         option)
            .map(response => response.json())
            .subscribe(res => {
             this.getdocument(this.researchid);
        },error => {
                this.global.swalAlertError();
           } );
  }



  insertauthor(){

let x='';
    if (this.author==undefined||this.author=="") {
      x=x+"*Author is required\n";
    }

    if (x=='') {
     let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("rid",this.researchid.toString());
                     urlSearchParams.append('aid', this.author.toString() );
                  let body = urlSearchParams.toString()
      var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Content-Type", "application/x-www-form-urlencoded");    
                  let option = new RequestOptions({ headers: header });
      this.global.swalLoading('');

       this.http.post(this.global.api + 'api.php?action=spResearchAuthor_Insert_Update',
       body,option)
          .map(response => response.json())
          .subscribe(res => {
            this.myControl.setValue('')
              this.getauthorselect();
             this.getauthor(this.researchid);   
                    this.author=''     
          },error => {
            console.log(Error); 
                this.global.swalAlertError();
           } );
        }else
          alert(x)
  }

  swalConfirm(id,text,ctr,ps,moe,co)
  {
    swal({
        title: text,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          if (ctr==1) {
             this.removeauthor(id);
          }if (ctr==2) {
             this.removekeyword(id);
          }if (ctr==3) {
             this.removediscipline(id);
          }if (ctr==4) {
             this.removefundingagency(id);
          }if (ctr==5) {
             this.removedocument(id);
          }if (ctr==6) {
             this.deleteauthor(id);
          }if (ctr==7) {
             this.removepubinfo(id);
          }
             
        }
      })
  }

insertfundingagency(){
let x='';
    if (this.inputfundingagency==undefined||this.inputfundingagency=="") {
      x=x+"*Funding Agency is required\n";
    }

    if (x=='') {
     let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("rid",this.researchid.toString());
                     urlSearchParams.append('sofid', this.inputfundingagency.toString() );
                  let body = urlSearchParams.toString()
      var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Content-Type", "application/x-www-form-urlencoded");    
                  let option = new RequestOptions({ headers: header });
      this.global.swalLoading('');

       this.http.post(this.global.api + 'api.php?action=spResearchFundingAgency_Insert_Update',
       body,option)
          .map(response => response.json())
          .subscribe(res => {
            console.log(res)
             this.getfundingagency(this.researchid);  
              this.inputfundingagency='';          
          },error => {
            console.log(Error); 
                this.global.swalAlertError();
           } );
        }else
          alert(x)
  }
  removefundingagency(id){                                                                 
    var header = new Headers();
      header.append("Accept", "application/json");
      header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      this.http.get(this.global.api + 'api.php?action=spResearchFundingAgency_Delete&id='+id,
         option)
            .map(response => response.json())
            .subscribe(res => {
             this.getfundingagency(this.researchid); 
        },error => {
                this.global.swalAlertError();
           } );
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
                this.global.swalClose();
                this.fundingagencyarrayinresearch= res;
             this.global.swalClose();
          });


  }

  deleteauthor(id){
    this.http.get(this.global.api + 'api.php?action=spAuthor_Delete&id='+id)
              .map(response => response.json())
              .subscribe(res => {
                if (res.status==0) {
                  this.getauthorselect();
                  this.global.swalSuccess("Author Deleted!");
                }else
                  this.global.swalAlert("Delete Failed!",'Author is linked to a research.','warning');
          });
  }


  removeauthor(id){                                                                       
    var header = new Headers();
      header.append("Accept", "application/json");
      header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      this.http.get(this.global.api + 'api.php?action=spResearchAuthorDelete&aid='+id+'&rid='+this.researchid,
         option)
            .map(response => response.json())
            .subscribe(res => {
             this.getauthor(this.researchid); 

        },error => {
                this.global.swalAlertError();
           } );
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
         this.getauthorselect() 
             this.global.swalClose();
          });


  }


insertdiscipline(){
let x='';
    if (this.inputdiscipline==undefined||this.inputdiscipline=="") {
      x=x+"*discipline is required\n";
    }

    if (x=='') {
     let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("rid",this.researchid.toString());
                     urlSearchParams.append('did', this.inputdiscipline.toString() );
                  let body = urlSearchParams.toString()
      var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Content-Type", "application/x-www-form-urlencoded");    
                  let option = new RequestOptions({ headers: header });
      this.global.swalLoading('Adding Discipline');

       this.http.post(this.global.api + 'api.php?action=spResearchProgramDiscipline_Insert_Update',
       body,option)
          .map(response => response.json())
          .subscribe(res => {
             this.getdiscipline(this.researchid);  
              this.inputdiscipline='';          
          },error => {
            console.log(Error); 
                this.global.swalAlertError();
           } );
        }else
          alert(x)
  }
  removediscipline(id){                                                                   
    var header = new Headers();
      header.append("Accept", "application/json");
      header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      this.http.get(this.global.api + 'api.php?action=spResearchProgramDiscipline_Delete&id='+id,
         option)
            .map(response => response.json())
            .subscribe(res => {
             this.getdiscipline(this.researchid); 

        },error => {
                this.global.swalAlertError();
           } );
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
                this.getdisciplineselect(rid)
             this.global.swalClose();
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
             this.global.swalClose();
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
             this.global.swalClose();
          });


  }

insertkeyword(){
    let x='';
    this.keyword=this.myControl2.value;
    if (this.keyword==undefined||this.keyword=="") {
      x=x+"*keyword is required\n";
    }

    if (x=='') {
     let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("rid",this.researchid.toString());
                     urlSearchParams.append('kw', this.keyword.toString() );
                  let body = urlSearchParams.toString()
      var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Content-Type", "application/x-www-form-urlencoded");    
                  let option = new RequestOptions({ headers: header });
      this.global.swalLoading('');

       this.http.post(this.global.api + 'api.php?action=spResearchKeyword_Insert',
       body,option)
          .map(response => response.json())
          .subscribe(res => {
            this.global.swalClose()
             this.getkeyword(this.researchid);  
              this.keyword='';          
          },error => {
            console.log(Error); 
                this.global.swalAlertError();
           } );
        }else
          alert(x)
  }
  removekeyword(id){                                                                   
    var header = new Headers();
      header.append("Accept", "application/json");
      header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      this.http.get(this.global.api + 'api.php?action=spResearchKeyword_Delete&id='+id,
         option)
            .map(response => response.json())
            .subscribe(res => {
             this.getkeyword(this.researchid); 

        },error => {
                this.global.swalAlertError();
           } );
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
             this.global.swalClose();
          });


  }



  add(stepper: MatStepper) {
  	let x=''
  	if (this.inputtitle==undefined||this.inputtitle=="") {
  		x=x+"*Research Title is required\n";
  	}if (this.inputcompany==undefined||this.inputcompany=="") {
  		x=x+"*Your role has not been assigned to any company.\n";
  	}if (this.inputabstract==undefined||this.inputabstract=="") {
  		x=x+"*Abstract is required\n";
  	}if (this.inputdegreelevel==undefined||this.inputdegreelevel=="") {
  		x=x+"*Degree Level is required\n";
  	}

  	if (x=='') {
      if (this.counter>1) {
       let urlSearchParams = new URLSearchParams();
                      urlSearchParams.append("id",this.researchid);
                      urlSearchParams.append("title",this.inputtitle);
                       urlSearchParams.append('company', this.inputcompany);
                       urlSearchParams.append('abstract', this.inputabstract);
                       urlSearchParams.append('degreelevel', this.inputdegreelevel);
                       urlSearchParams.append('user', this.global.requestid());
                    let body = urlSearchParams.toString()
                    var header = new Headers();
                    header.append("Accept", "application/json");
                    header.append("Content-Type", "application/x-www-form-urlencoded");    
                    let option = new RequestOptions({ headers: header });
                  this.global.swalLoading('');
                  
                   this.http.post(this.global.api + 'api.php?action=researchedit',body,option)
                    .map(response => response.text())
                    .subscribe(res => {
                       this.global.swalClose();
                        this.getdisciplineselect(this.researchid)
                    },error => {
                      console.log(Error); 
                          this.global.swalAlertError();
                     } );


      }else{
      this.counter++;
			let urlSearchParams = new URLSearchParams();
	                    urlSearchParams.append("title",this.inputtitle);
	                     urlSearchParams.append('company', this.inputcompany);
	                     urlSearchParams.append('abstract', this.inputabstract);
	                     urlSearchParams.append('degreelevel', this.inputdegreelevel);
	                     urlSearchParams.append('user', this.global.requestid());
	                  let body = urlSearchParams.toString()
	     	 var header = new Headers();
	                  header.append("Accept", "application/json");
	                  header.append("Content-Type", "application/x-www-form-urlencoded");    
	                  let option = new RequestOptions({ headers: header });
          this.global.swalLoading('');
	       	this.http.post(this.global.api + 'api.php?action=researchadd',body,option)
	          .map(response => response.json())
	          .subscribe(res => {  
	             this.global.swalClose();
	             this.researchid = res.id;
                     let urlSearchParams2 = new URLSearchParams();
                        urlSearchParams2.append("rid",this.researchid.toString());
                         urlSearchParams2.append('remarks', null);
                         urlSearchParams2.append('status', '0');
                      let body2 = urlSearchParams2.toString()
                      var header = new Headers();
                            header.append("Accept", "application/json");
                            header.append("Content-Type", "application/x-www-form-urlencoded");    
                            let option2 = new RequestOptions({ headers: header });
                       this.http.post(this.global.api + 'api.php?action=spResearchResearchStatus_Insert',body2,option2)
                            .map(response => response.text())
                            .subscribe(res => {
                            },Error=>{
                              
                            });  
                this.getdisciplineselect(this.researchid)
               this.getauthorselect();
	          },error => {
	            console.log(Error); 
	                this.global.swalAlertError();
	           } );
          }
      stepper.next();
  	}else
  		alert(x)
  }
  noclick()
{
  this.dialogRef.close(1)
}

  researchdone(type) {
    let x=''
    if (this.form.value.avatar==undefined||this.form.value.avatar==null) {
      this.form.value.avatar=''
    }else{
      if (this.form.value.avatar.filetype!='application/pdf') {
      x=x+"*Main Document Attachment must be in PDF format\n";
      }
    }

    if (this.authorsarrayinresearch==undefined) {
      x=x+"*At least 1 Author is required\n";
      
    }else{
      if (this.authorsarrayinresearch[0].id==null) {
      x=x+"*At least 1 Author is required\n";
      }
    }

    if (this.disciplinearrayinresearch==undefined) {
      x=x+"*At least 1 Discipline is required\n";
      
    }else{
      if (this.disciplinearrayinresearch[0].id==null) {
      x=x+"*At least 1 Discipline is required\n";
      }
    }
    if (this.keywordarray==undefined) {
      x=x+"*At least 1 Keyword is required\n";
      
    }else{
      if (this.keywordarray[0].id==null) {
      x=x+"*At least 1 Keyword is required\n";
      }
    }


    if (x=='') {


    let c=''
    let counter=0
     if (this.pubtitle==undefined||this.pubtitle=='') {
      c=c+"*Publication Title is required\n";counter++
    }
    if (this.pubvolume==undefined||this.pubvolume=='') {
      c=c+"*Publication Volume is required\n";counter++
    }
    if (this.pubissue==undefined||this.pubissue=='') {
      c=c+"*Publication Issue is required\n";counter++
    }
    if (this.pubyear==undefined||this.pubyear=='') {
      c=c+"*Publication Year is required\n";counter++
    }
    if (this.pubpublisher==undefined||this.pubpublisher=='') {
      c=c+"*Publisher is required\n";counter++
    }

    if (c=='') {
     this.insertpublicationinfo();
    }

    if (counter>0&&counter<5) {
      console.log(counter);
       alert("All Fields in the Publication info should be filled up!")
    }else {                   

      let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("rid",this.researchid.toString());
                     urlSearchParams.append('name', this.form.value.avatar.filename );
                     urlSearchParams.append('doc', this.form.value.avatar.value);
                     urlSearchParams.append('type', '0' );  
                     urlSearchParams.append('status', '0' );  
                  let body = urlSearchParams.toString()
      var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Content-Type", "application/x-www-form-urlencoded");    
                  let option = new RequestOptions({ headers: header });
      this.global.swalLoading('');

       this.http.post(this.global.api + 'api.php?action=spResearchDocument_Insert',
       body,option)
          .map(response => response.json())
          .subscribe(res => {
          },error => {
            console.log(Error); 
                this.global.swalAlertError();
           } );
                       if (type==0) {
                        this.global.swalSuccess("Saved as Draft!");
                      }else{
                        this.global.swalSuccess("Research Submitted!");

                         let urlSearchParams2 = new URLSearchParams();
                            urlSearchParams2.append("rid",this.researchid.toString());
                             urlSearchParams2.append('remarks', null);
                             urlSearchParams2.append('status', '1');
                          let body2 = urlSearchParams2.toString()
                          var header = new Headers();
                                header.append("Accept", "application/json");
                                header.append("Content-Type", "application/x-www-form-urlencoded");    
                                let option2 = new RequestOptions({ headers: header });
                           this.http.post(this.global.api + 'api.php?action=spResearchResearchStatus_Insert',body2,option2)
                                .map(response => response.text())
                                .subscribe(res => {
                                });
                      }  
                         setTimeout(() => {
                          if (type==0) {
                            this.dialogRef.close(2);
                            // code...
                          }else{
                            this.dialogRef.close(3);
                          }
                          }, 1500);
      }     
    }else
      alert(x)
  }


  openDialogauthor(): void {
    const dialogRef = this.dialog.open(ManageAuthorComponent, {
      width: '60%',data:{data:'elton'}, disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      if (result==1) {
         this.getauthorselect()  
      }
    });
  }
}
