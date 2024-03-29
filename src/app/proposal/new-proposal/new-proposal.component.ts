import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../global.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; 
import {Http, Headers, RequestOptions} from '@angular/http';
import Swal from 'sweetalert2';

import { MatStepper,MatDialog,MatDialogRef } from '@angular/material';
import { Inject} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material';
import { UpdateProjectComponent } from './../../proposal/new-proposal/update-project/update-project.component';
import { ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

const swal = Swal;
@Component({
  selector: 'app-new-proposal',
  templateUrl: './new-proposal.component.html',
  styleUrls: ['./new-proposal.component.scss']
})
export class NewProposalComponent implements OnInit {

  form: FormGroup;
  form2: FormGroup;
  loading: boolean = false;
  @ViewChild('fileInput',{static:false}) fileInput: ElementRef;
  yeararr=[];

	proj=false;
	prog=false;
	total=0;

	title;
	duration;
	fagency;

	cleader;
	gender;
	email;
	agencies;
	address;
	telephone;
	fax;
	fangency;

  proposalid=1;
  programid;
	proposalcounter=false;
  projectlists;

  protitle='';
  produration='';
  fundingagency;
  fangency1;

  ps=0;
  moe=0;
  co=0;
  budgettotal=0
  budgetlist;
  budgetlist2;
  balltotal=0
  esummary='';

  projecttitle;
  projectduration;
  coopagency='';
  cagencylist
  projectid=''
  calists

  rndstation=''
  scommodity
  descipline

 projectclassification = [];
 projectmoi = [];
 projectpa = [];
 projectsector = [];
 projectdiscipline = [];
 significance=''
 objectives=''
 methodology=''
 majora=''
 expectedo=''
   targetb=''
  year1=''
  year2=''
  month1=''
  month2=''

majoralabel='Choose a file';
modeofimplementation='';
labeltitle="Create Capsule Proposal";


techpromotion=false;
basic1=false;
applied1=false;
pilottesting=false;
clss=0;

proponenttype="Project Leader"
proponents
fname=''
mname=''
lname=''
suffix=''
proponenttypeinput='2'

//G!start
  
//G!end
  constructor(public dialogRef: MatDialogRef<NewProposalComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog, private fb: FormBuilder,public global: GlobalService,private http: Http,private route: ActivatedRoute, private router: Router) {
    this.http.get(this.global.api + 'api.php?action=FundingAgency_List',
         this.global.option)
            .map(response => response.json())
            .subscribe(res => {
              this.fundingagency= res;
        });

       this.modeofimplementation="Single Agency";

    this.cleader = global.user.fname+" "+global.user.mname+" "+global.user.surname+" "+global.user.ext;
    this.gender = global.user.sex;
    this.email = global.requestemail();
    this.agencies = data.company;
    this.address = global.user.psgc1;
    this.telephone = global.user.telno;


    var dt = new Date();
     var year = dt.getFullYear() - 10;
    for (var i = 0; i < 20; i++) {
      this.yeararr[i] = year;
      year++;
    }

    this.createForm();

  }


  changeclassification(x){
      this.techpromotion=false;
      this.basic1=false;
      this.applied1=false;
      this.pilottesting=false;
      if (x==1) {
      this.basic1=true;
      }
      if (x==2) {
      this.applied1=true;
      }
      if (x==3) {
      this.pilottesting=true;
      }
      if (x==4) {
      this.techpromotion=true;
      }
      this.clss = x
    }

  see(assign){
    this.fangency1=assign;
  }
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

// onFileChange(event) {
//   let reader = new FileReader();
//     if(event.target.files && event.target.files.length > 0) {
//       let file = event.target.files[0];
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         this.form.get('avatar').setValue({
//           filename: file.name,
//           filetype: file.type,
//           value: reader.result.toString().split(',')[1]
//         })
//         if (this.form.value.avatar!=null) {
//             this.majoralabel = file.name;
//           }else{
//             this.majoralabel = "Choose a file";
//           }
//       };
//     }
//   }


  clearFile() {
    this.majoralabel = "Choose a file...";
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

insertdocument(){
    
    let x='';
    if (this.supdoclabel=='Choose a file...') {
      x=x+"*Supporting document is required\n";
    }

    if (x=='') {
     let urlSearchParams = new URLSearchParams();
                     urlSearchParams.append("rid",this.proposalid.toString());
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
             //this.getdocument(this.proposalid);  
                this.global.swalClose();
          },error => {
            console.log(Error); 
                this.global.swalAlertError();
           } );
        }else
          alert(x)
  }

  checkbox(event,type,text){
    if (event.checked==true) {
       if (type==1) {
         this.projectclassification=[]
         this.projectclassification.push(text);
       }else 
       if (type==2) {
         this.projectmoi.push(text);
       }else 
       if (type==3) {
         this.projectpa.push(text);
       }else 
       if (type==4) {
         this.projectsector.push(text);
       }else 
       if (type==5) {
         this.projectdiscipline.push(text);
       }

    }else{
      if (type==1) {
           for( var i = 0; i < this.projectclassification.length; i++){ 
             if ( this.projectclassification[i] === text) {
               this.projectclassification.splice(i, 1); 
             }
          }
       }else
      if (type==2) {
           for( var i = 0; i < this.projectmoi.length; i++){ 
             if ( this.projectmoi[i] === text) {
               this.projectmoi.splice(i, 1); 
             }
          }
       }else
      if (type==3) {
           for( var i = 0; i < this.projectpa.length; i++){ 
             if ( this.projectpa[i] === text) {
               this.projectpa.splice(i, 1); 
             }
          }
       }else
      if (type==4) {
           for( var i = 0; i < this.projectsector.length; i++){ 
             if ( this.projectsector[i] === text) {
               this.projectsector.splice(i, 1); 
             }
          }
       }else
      if (type==4) {
           for( var i = 0; i < this.projectdiscipline.length; i++){ 
             if ( this.projectdiscipline[i] === text) {
               this.projectdiscipline.splice(i, 1); 
             }
          }
       }
    }

  }


  totalb(ps,co,moe){
    return parseInt(ps)+parseInt(moe)+parseInt(co);
  }
  totalb2(ps,co,moe){
    return parseInt(ps)+parseInt(moe)+parseInt(co);
  }
  btotal(){
    this.budgettotal=this.ps +this.moe + this.co;
  }
  ngOnInit() {
  }
  majorainfo(){
    this.global.swalinfo("<p style='text-align:left;'><b>Major Activities</b> – Enumerate in chronological order the tasks to be undertaken. Use gantt chart.</p>");
  }
  agency(){
    this.global.swalinfo("<p style='text-align:left;'><b>Cooperating Agencies</b> – agencies participating in the R & D work.<br><br><b>R & D Station</b> – station or unit where R & D will be actually conducted.<br><br><b>Classification</b> – indicates whether the program/project is research or development.</p>");
  }
  infoduration(){
    this.global.swalinfo("<p><b>Duration</b> - Number of months the program will be implemented.</p>");
  }
  infops(){
    this.global.swalinfo("<p><b>PS</b> - Requirement for wages, salaries, honoraria, additional hire and other personnel benefits.</p>");
  }
  infomoe(){
    this.global.swalinfo("<p><b>MOE</b> - Requirement for supplies materials, travel expenses, communnication and othher services.</p>");
  }
  infoco(){
    this.global.swalinfo("<p><b>CO</b> - Requirement for facilities and equipment needed by the program.</p>");
  }
  leader(){
  	this.global.swalinfo("<p style='text-align:left;'>The overall R & D coordinator (whether multi-agency of single-agency R & D) or the program/project leader. Program leader is the overall coordinator while serving also as the project leader.</p>");
  }

  summary(){
  	this.global.swalinfo("<b>Executive Summary</b> - Overview of the program including the significance, objectives, methodology, major activities and expected output of the program.");
  }
  budget(){
  	this.global.swalinfo("<b>Budget Summary</b> - Personal Services (PS), maintenance and other operating expenses (MOE), and capital outlay (CO) requirement of the whole program by source.");
  }
  classification(){
    this.global.swalinfo("<b>Classification</b> - indicates whether the program/project is research or development.");
  }
  implementation(){
    this.global.swalinfo("<b>Mode of Implementation</b> - indicate whether the R & D will be undertaken by one or more than one agency.");
  }
  basic(){
    this.global.swalinfo("<b>Basic research </b> - is an experimental or theoretical work undertaken primarily to acquire new knowledge of the underlying foundations of phenomena and observable facts, without any particular or specific application or use in view.");
  }
  applied(){
    this.global.swalinfo("<b>Applied research</b> - is an original investigation undertaken in order to acquire new knowledge directed primarily towards a specific aim or objective.");
  }
  ptesting(){
    this.global.swalinfo("<b>Pilot Testing</b> - is an innovative work to confirm and demonstrate the feasibility of actually using a technology; gauging end user’s reaction to introduction of improved technologies and identifying potential problems related to wider dissemination, utilization and adoption so that these can be fed back to researchers.");
  }
  promotion(){
    this.global.swalinfo("<b>Technology promotion/commercialization</b> - is an activity involving application of technologies on a commercial scale by an identified entrepreneur or user primarily to increase his income/profits and productivity; technologies utilized/produced on a pre-commercial scale including market testing jointly undertaken with a client.");
  }
  development(){
    this.global.swalinfo("<b>Developmental research</b> - is a systematic work, drawing on existing knowledge gained from research and/or practical experience that is directed to producing new materials, products or devices, installing new processes, systems and services and improving substantially those already produced or installed.");
  }
  pagenda(){
    this.global.swalinfo("<b>Priority Areas/STAND Classification</b> - Identify the classification of the R & D proposal in the S & T Agenda for National Development.");
  }
  sectorc(){
    this.global.swalinfo("<b>Sector</b> - indicate whether crops, livestock, forestry, agricultural resources or socio-economics; fisheries or aquatic resources; biotechnical, pharmaceutical, or health services; biotechnology, information technology, material science, photonics or space technology; industry, energy, utilities or infrastructure.");
  }
  disciplineinfo(){
    this.global.swalinfo("<b>Discipline</b> - The specific field to be studied (e.g. plant breeding, taxonomy).");
  }
  significanceinfo(){
    this.global.swalinfo("<b>Significance</b> - State the research problem and significance of the project to the current needs of the country. The proposal should justify resource expenditure. A typical justification would include a brief introduction, a general statement concerning the historical basis for R & D, utilization of the expected output and the impact the information generated will have on science, the target users and the country.");
  }
  expectedoinfo(){
    this.global.swalinfo("<b>Expected Output</b> - Indicate the specific products, processes or services which the project is expected to produce and how these can be used; quantify when possible");
  }
  targetbinfo(){
    this.global.swalinfo("<b>Target Beneficiaries</b> - Who the clienteles are and what are the expected outcome/effects of the use of the project outputs).");
  }
  schedinfo(){
    this.global.swalinfo("<b>Implementing Schedule</b> - The duration of the project in months including planned start date and expected.");
  }
  budgetprojectinfo(){
    this.global.swalinfo("<b>Estimated Annual Budget</b> - The budget requirement for personal services (PS), maintenance and other operating expenses (MOOE), capital outlay(CO) for the first of implementation and the total budget requirement by source of fund.");
  }

  add(stepper: MatStepper) {
  	let x=''
  	if (this.cleader==undefined||this.cleader=="") {
  		x=x+"*Coordinator/Leader is required\n";
  	}if (this.gender==undefined||this.gender=="") {
  		x=x+"*Gender is required\n";
  	}if (this.email==undefined||this.email=="") {
  		x=x+"*Email is required\n";
  	}if (this.agencies==undefined||this.agencies=="") {
  		x=x+"*Agency(ies) is required\n";
  	}if (this.address==undefined||this.address=="") {
  		x=x+"*Address is required\n";
  	}if (this.telephone==undefined||this.telephone=="") {
  		x=x+"*Telephone is required\n";
  	}
  	if (x=='') {
  	  

      stepper.next();
  	}else
  		alert(x)
  }

  proposalinsert(stepper: MatStepper) {
  let x=''
  	if (this.title==undefined||this.title=="") {
  		x=x+"*Title is required\n";
  	}if (this.duration==undefined||this.duration=="") {
  		x=x+"*Duration is required\n";
  	}if (this.fagency==undefined||this.fagency=="") {
  		x=x+"*Funding Agency is required\n";
  	}
    // if (this.proj==false&&this.prog==false) {
    //   x=x+"*Must select a proposal type!\n";
    // }

  	if (x=='') {
      let urlSearchParams = new URLSearchParams();
        urlSearchParams.append("GeneralTitle",this.title);
	     	urlSearchParams.append('LeadAgency', this.fagency);
	     	urlSearchParams.append('Street', this.global.user.street1);
	     	urlSearchParams.append('Address_PSGC', this.global.user.psgc1);
	     	urlSearchParams.append('Telephone', this.telephone);
	     	urlSearchParams.append('Fax', '');
	     	urlSearchParams.append('Email', this.email);
	     	urlSearchParams.append('FundingAgency_id', this.fagency);
	     	urlSearchParams.append('TotalDuration', this.duration);
         urlSearchParams.append('createdBy', this.global.userid.toString());
         if (this.programid!=undefined) {
           urlSearchParams.append('id', this.programid.toString());
         }
      let body = urlSearchParams.toString()
  		var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Content-Type", "application/x-www-form-urlencoded");    
                  let option = new RequestOptions({ headers: header });
  	  this.proposalcounter = true;
  	  this.global.requestToken();

      if (this.programid==undefined) {
	    this.http.post(this.global.api + 'api.php?action=proposalinsert',
	     body,option)
          .map(response => response.json())
          .subscribe(res => {
             this.proposalid=res.id;
             this.http.get(this.global.api + 'api.php?action=programinsert&proposalid='+this.proposalid, option)
                .map(response => response.json())
                .subscribe(res => {
                  this.programid= res.id;
                    this.projecttitle = this.title;
                    this.projectduration = this.duration;
                         let urlSearchParams = new URLSearchParams();
                                        urlSearchParams.append("programid",this.programid.toString());
                                         urlSearchParams.append('title', this.projecttitle );
                                         urlSearchParams.append('duration', this.projectduration);
                                      let body = urlSearchParams.toString()
                          var header = new Headers();
                                      header.append("Accept", "application/json");
                                      header.append("Content-Type", "application/x-www-form-urlencoded");    
                                      let option = new RequestOptions({ headers: header });
                          this.global.swalLoading('Adding project title');
                           this.http.post(this.global.api + 'api.php?action=projectadd',
                           body,option)
                              .map(response => response.json())
                              .subscribe(res => {
                                  let urlSearchParams = new URLSearchParams();
                                     urlSearchParams.append("ProposalID",this.programid);
                                     urlSearchParams.append('UserID', this.global.user.id);
                                     urlSearchParams.append('FName', this.global.user.fname);
                                     urlSearchParams.append('MName', this.global.user.mname);
                                     urlSearchParams.append('LName', this.global.user.surname);
                                     urlSearchParams.append('SName', this.global.user.ext);
                                  let body = urlSearchParams.toString()
                                  var header = new Headers();
                                              header.append("Accept", "application/json");
                                              header.append("Content-Type", "application/x-www-form-urlencoded");    
                                              let option = new RequestOptions({ headers: header });
                                     this.http.post(this.global.api + 'api.php?action=spProposal_Proponent_Insert',body, option)
                                      .map(response => response.json())
                                      .subscribe(res => {
                                         this.global.swalClose();  
                                         this.getprojectlist(this.programid) 
                                         this.http.get(this.global.api + 'api.php?action=spProposal_Proponent_Select&id='+this.proposalid, option)
                                          .map(response => response.json())
                                          .subscribe(res => {
                                            this.lname=this.global.user.surname
                                            this.fname=this.global.user.fname
                                            this.mname=this.global.user.mname
                                            this.suffix=this.global.user.ext
                                            this.insertproponent('1')
                                            stepper.next();
                                        },error => {
                                          console.log(Error); 
                                              this.global.swalAlertError();
                                         } );
                                      });
                              },error => {
                                console.log(Error); 
                                    this.global.swalAlertError();
                               } );
                });
          },error => {
          	console.log(Error); 
                this.global.swalAlertError();
           } );
        // code...
      }else{
        this.http.post(this.global.api + 'api.php?action=spProposal_Update',
         body,option)
          .map(response => response.text())
          .subscribe(res => {
               this.http.get(this.global.api + 'api.php?action=spProposal_Proponent_Select&id='+this.proposalid, option)
                .map(response => response.json())
                .subscribe(res => {
                   stepper.next();
              },error => {
                console.log(Error); 
                    this.global.swalAlertError();
               } );
          },error => {
            console.log(Error); 
                this.global.swalAlertError();
           } );
      }
  	}

  	if (x!='') {
  		alert(x)
  	}

  	

  }

noclick()
{
  this.dialogRef.close(1)
}
  getprojectlist(programid){
    var header = new Headers();
      header.append("Accept", "application/json");
      header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      this.http.get(this.global.api + 'api.php?action=getprojecttitles&programid='+programid,
         option)
            .map(response => response.json())
            .subscribe(res => {
              this.projectlists= res;
              this.projectid=res[0].id;
        });
  }


  insertcagency(){

let x='';
    if (this.coopagency==undefined||this.coopagency=="") {
      x=x+"*Cooperating Agency is required\n";
    }

    if (x=='') {
     let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("pid",this.projectid.toString());
                     urlSearchParams.append('cid', this.coopagency.toString() );
                  let body = urlSearchParams.toString()
      var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Content-Type", "application/x-www-form-urlencoded");    
                  let option = new RequestOptions({ headers: header });
      this.proposalcounter = true;
      this.global.swalLoading('Adding project title');

       this.http.post(this.global.api + 'api.php?action=projectaddcoopagency',
       body,option)
          .map(response => response.json())
          .subscribe(res => {
             this.global.swalClose();
             this.coopagency = null;
             this.getcooperating(this.projectid);     
          },error => {
            console.log(Error); 
                this.global.swalAlertError();
           } );
        }else
          alert(x)
  }
  getproponent(projectid){
    var header = new Headers();
      header.append("Accept", "application/json");
      header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      this.http.get(this.global.api + 'api.php?action=spProposal_ProjectProponent_List&projectid='+projectid,
         option)
            .map(response => response.json())
            .subscribe(res => {
              this.proponents= res;
              console.log(res);
              if (res[0].id!=null) {
                this.proponenttype = 'Member'
              }else
                this.proponenttype = 'Project Leader'
        });
  }

  insertproponent(g){

let x='';
    if (this.fname==undefined||this.fname=="") {
      x=x+"*First name is required\n";
    }
    if (this.lname==undefined||this.lname=="") {
      x=x+"*Last name is required\n";
    }
    if (x=='') {
     let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("pid",this.projectid.toString());
                    urlSearchParams.append("lname",this.lname.toString());
                    urlSearchParams.append("fname",this.fname.toString());
                    urlSearchParams.append("mname",this.mname.toString());
                    urlSearchParams.append("sname",this.suffix.toString());
                    urlSearchParams.append("percent","0");
                     urlSearchParams.append('type', g );
                  let body = urlSearchParams.toString()
      var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Content-Type", "application/x-www-form-urlencoded");    
                  let option = new RequestOptions({ headers: header });
      this.proposalcounter = true;
      this.global.swalLoading('Adding project Proponent');

       this.http.post(this.global.api + 'api.php?action=spProposal_ProjectProponent_Insert',
       body,option)
          .map(response => response.json())
          .subscribe(res => {
             this.global.swalClose();
             this.coopagency = null;
             this.fname = ''
             this.lname = ''
             this.suffix = ''
             this.mname = ''
             this.proponenttypeinput = ''
             this.getproponent(this.projectid);     
          },error => {
            console.log(Error); 
                this.global.swalAlertError();
           } );
        }else
          alert(x)
  }
  removeproponent(id){
                                                                                              
    var header = new Headers();
      header.append("Accept", "application/json");
      header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      this.http.get(this.global.api + 'api.php?action=spProposal_ProjectProponent_Delete&id='+id,
         option)
            .map(response => response.json())
            .subscribe(res => {
             this.getproponent(this.projectid); 

        },error => {
                this.global.swalAlertError();
           } );
  }

  getcooperating(projectid){
    var header = new Headers();
      header.append("Accept", "application/json");
      header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      this.http.get(this.global.api + 'api.php?action=getcoopagency&projectid='+projectid,
         option)
            .map(response => response.json())
            .subscribe(res => {
              this.calists= res;

              if (res[0].id!=null) {
              this.modeofimplementation="Multi Agency";
              }else
              this.modeofimplementation="Single Agency";
        });
  }

  getbudget(programid){
    var header = new Headers();
      header.append("Accept", "application/json");
      header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      this.http.get(this.global.api + 'api.php?action=getbudget&programid='+programid,
         option)
            .map(response => response.json())
            .subscribe(res => {
              this.budgetlist= res;
             console.log(res);
        });
  }

  getbudget2(projectid){
    var header = new Headers();
      header.append("Accept", "application/json");
      header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      this.http.get(this.global.api + 'api.php?action=getbudget2&projectid='+projectid,
         option)
            .map(response => response.json())
            .subscribe(res => {
              this.budgetlist2= res;
        });
  }


  addproject(){
    if (this.protitle==''||this.produration=='') {
      alert("Project title and Duration is required!")
    }else
    {
     let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("programid",this.programid.toString());
                     urlSearchParams.append('title', this.protitle );
                     urlSearchParams.append('duration', this.produration);
                  let body = urlSearchParams.toString()
      var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Content-Type", "application/x-www-form-urlencoded");    
                  let option = new RequestOptions({ headers: header });
      this.proposalcounter = true;
      this.global.swalLoading('Adding project title');

       this.http.post(this.global.api + 'api.php?action=projectadd',
       body,option)
          .map(response => response.json())
          .subscribe(res => {
             this.global.swalClose();
             this.protitle = '';
             this.produration = '';
             this.getprojectlist(this.programid);           

          },error => {
            console.log(Error); 
                this.global.swalAlertError();
           } );
    }
  }
  removeprojecttitle(projectid){
                                                                                              
    var header = new Headers();
      header.append("Accept", "application/json");
      header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      this.http.get(this.global.api + 'api.php?action=removeprojecttitle&projectid='+projectid,
         option)
            .map(response => response.json())
            .subscribe(res => {
             this.getprojectlist(this.programid);   
        },error => {
                this.global.swalAlertError();
           } );
  }
  removecagency(id){
                                                                                              
    var header = new Headers();
      header.append("Accept", "application/json");
      header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      this.http.get(this.global.api + 'api.php?action=projectdeletecoopagency&id='+id,
         option)
            .map(response => response.json())
            .subscribe(res => {
             this.getcooperating(this.projectid); 

        },error => {
                this.global.swalAlertError();
           } );
  }
  removebudget(id,ps,moe,co){                                                                                    
    var header = new Headers();
      header.append("Accept", "application/json");
      header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      this.http.get(this.global.api + 'api.php?action=removebudget&bid='+id,
         option)
            .map(response => response.json())
            .subscribe(res => {
       this.balltotal = this.balltotal - (parseInt(ps)+parseInt(moe)+parseInt(co)) ; 
             this.getbudget(this.programid);   
        },error => {
                this.global.swalAlertError();
           } );
  }
  removebudget2(id,ps,moe,co){                                                                                    
    var header = new Headers();
      header.append("Accept", "application/json");
      header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      this.http.get(this.global.api + 'api.php?action=removebudget2&bid='+id,
         option)
            .map(response => response.json())
            .subscribe(res => {
             this.balltotal = this.balltotal - (parseInt(ps)+parseInt(moe)+parseInt(co)) ; 
             this.getbudget2(this.projectid);   
        },error => {
                this.global.swalAlertError();
           } );
  }
  proposaltype(x){
  	if (x==0) {
  		if (this.prog==false) {
  			this.prog = true;
  			this.proj = false;
  		}
  		else
  			this.prog = false;
  	}
  	else{
  		if (this.proj==false) {
  			this.proj = true;
  			this.prog = false;
  		}
  		else
  			this.proj = false;
  	}
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
             this.removeprojecttitle(id);
            // code...
          }else if (ctr==2) {
             this.removebudget(id,ps,moe,co);
          }else if (ctr==3) {
             this.removecagency(id);
          }else if (ctr==4) {
             this.removebudget2(id,ps,moe,co);
          }else if (ctr==5) {
             this.removeproponent(id);
          }
             
        }
      })
  }


  addbudget(){
  let x=''
    if (this.fangency1==undefined||this.fangency1=="") {
      x=x+"*Source of Fund is Required\n";
    }if (this.ps==0) {
      x=x+"*PS is required\n";
    }if (this.co==0) {
      x=x+"*Co is required\n";
    }if (this.moe==0) {
      x=x+"*MOE is required\n";
    }
    if (x=='') {
                  let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("sof",this.fangency1);
                     urlSearchParams.append('ps', this.ps.toString());
                     urlSearchParams.append('moe', this.moe.toString());
                     urlSearchParams.append('co', this.co.toString());
                     urlSearchParams.append('programid', this.programid.toString());
                  let body = urlSearchParams.toString()
      var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Content-Type", "application/x-www-form-urlencoded");    
                  let option = new RequestOptions({ headers: header });
      this.proposalcounter = true;
      this.global.requestToken();
       this.global.swalLoading('Adding Budget');

       this.http.post(this.global.api + 'api.php?action=addbudget',
       body,option)
          .map(response => response.json())
          .subscribe(res => {

             this.balltotal = this.balltotal+this.budgettotal;
             this.global.swalClose(); 
             this.ps = 0;
             this.moe = 0;
             this.co = 0;
             this.budgettotal = 0;
             this.getbudget(this.programid);             

          },error => {
            console.log(Error); 
                this.global.swalAlertError();
           } );
      }
    if (x!='') {
      alert(x)
    }
  }

  addbudget2(){
  let x=''
    if (this.fangency1==undefined||this.fangency1=="") {
      x=x+"*Source of Fund is Required\n";
    }if (this.ps==0) {
      x=x+"*PS is required\n";
    }if (this.co==0) {
      x=x+"*Co is required\n";
    }if (this.moe==0) {
      x=x+"*MOE is required\n";
    }
    if (x=='') {
                  let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("sof",this.fangency1);
                     urlSearchParams.append('ps', this.ps.toString());
                     urlSearchParams.append('moe', this.moe.toString());
                     urlSearchParams.append('co', this.co.toString());
                     urlSearchParams.append('projectid', this.projectid.toString());
                  let body = urlSearchParams.toString()
      var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Content-Type", "application/x-www-form-urlencoded");    
                  let option = new RequestOptions({ headers: header });
      this.proposalcounter = true;
      this.global.requestToken();
       this.global.swalLoading('Adding Budget');

       this.http.post(this.global.api + 'api.php?action=addbudget2',
       body,option)
          .map(response => response.text())
          .subscribe(res => {

             this.balltotal = this.balltotal+this.budgettotal;
             this.global.swalClose(); 
             this.ps = 0;
             this.moe = 0;
             this.co = 0;
             this.budgettotal = 0;
             this.getbudget2(this.projectid);
            console.log(res); 
          },error => {
            console.log(Error); 
                this.global.swalAlertError();
           } );
      }
    if (x!='') {
      alert(x)
    }
  }

 proposaldone(type){
   console.log('reasda')
   if (this.prog==true) {
      let x=''
        if (!(this.projectlists!=undefined&&this.projectlists[0].id!=null)) {
          x=x+"*At least 1 project title is required\n";
        }if (!(this.budgetlist!=undefined&&this.budgetlist[0].id!=null)) {
          x=x+"*At least 1 source of fund is required\n";
        }if (this.esummary==''||this.esummary==null) {
          x=x+"*Executive Summary is required\n";
        }
        if (x=='') {
                      let urlSearchParams = new URLSearchParams();
                        urlSearchParams.append("esummary",this.esummary);
                         urlSearchParams.append('pid', this.proposalid.toString());
                      let body = urlSearchParams.toString()
          var header = new Headers();
                      header.append("Accept", "application/json");
                      header.append("Content-Type", "application/x-www-form-urlencoded");    
                      let option = new RequestOptions({ headers: header });
          this.proposalcounter = true;
          this.global.requestToken();
           this.global.swalLoading('Saving New Proposal...');

           this.http.post(this.global.api + 'api.php?action=proposaldone',
           body,option)
              .map(response => response.json())
              .subscribe(res => {
                 this.global.swalClose(); 
                 this.dialogRef.close(5)
              },error => {
                console.log(Error); 
                    this.global.swalAlertError();
               } );
          }
        if (x!='') {
          alert(x)
        }
     }else{
       let x='';
       if (this.form.value.avatar==null) {
          x=x+"*DOST FORMS 1A AND 1B CAPSULE R&D PROPOSAL is required\n";
        }else{
          //if (this.form.value.avatar.filetype!='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'&&'application/vnd.ms-excel'!=this.form.value.avatar.filetype)
         // x=x+"*Major Activities attachment must be in xlsx or xls format(excel).\n";
        }
        
        if (x=='') {
          let start = this.year1.toString()+'-'+this.month1.toString()+'-'+'15';
          let completion = this.year2.toString()+'-'+this.month2.toString()+'-'+'15';
                      let urlSearchParams = new URLSearchParams();
                        urlSearchParams.append("id",this.projectid.toString());
                         urlSearchParams.append('title', this.projecttitle);
                         urlSearchParams.append('duration', this.projectduration.toString());
                         urlSearchParams.append('rndstation', this.rndstation.toString());
                         urlSearchParams.append('siteofi', '');
                         urlSearchParams.append('significance', this.significance.toString());
                         urlSearchParams.append('objectives', this.objectives.toString());
                         urlSearchParams.append('literature', '');
                         urlSearchParams.append('sbasis', '');
                         urlSearchParams.append('methodology', this.methodology);
                         urlSearchParams.append('majora', this.form.value.avatar.value);
                         urlSearchParams.append('expectedoutput', this.expectedo);
                         urlSearchParams.append('targetb', this.targetb.toString());
                         urlSearchParams.append('start', start);
                         urlSearchParams.append('completion', completion);
                      let body = urlSearchParams.toString()
          var header = new Headers();
                      header.append("Accept", "application/json");
                      header.append("Content-Type", "application/x-www-form-urlencoded");    
                      let option = new RequestOptions({ headers: header });
          this.proposalcounter = true;
          this.global.requestToken();
           this.global.swalLoading('Saving New Proposal...');

           this.http.post(this.global.api + 'api.php?action=projectinsert',
           body,option)
              .map(response => response.text())
              .subscribe(res => {
                 this.global.swalClose(); 
                 for (var i = 0; i < this.projectdiscipline.length; i++) {
                   this.http.get(this.global.api + 'api.php?action=spProposal_ProjectDiscipline_Insert_Update&projectid='+this.projectid.toString()+"&cid="+this.projectdiscipline[i])
                      .map(response => response.text())
                      .subscribe(res => {
                      });
                 }
                 for (var i = 0; i < this.projectpa.length; i++) {
                   this.http.get(this.global.api + 'api.php?action=spProposal_ProjectPriorityAgenda_Insert_Update&projectid='+this.projectid.toString()+"&cid="+this.projectpa[i])
                      .map(response => response.text())
                      .subscribe(res => {
                      });
                 }

                 for (var i = 0; i < this.projectsector.length; i++) {
                   this.http.get(this.global.api + 'api.php?action=spProposal_ProjectSector_Insert_Update&projectid='+this.projectid.toString()+"&cid="+this.projectsector[i])
                      .map(response => response.text())
                      .subscribe(res => {
                      });
                 }


                 //mode of implementaion--- automatic
                 var z='2'
                 if (this.modeofimplementation == "Single Agency") {
                  z='1';
                 }
                   this.http.get(this.global.api + 'api.php?action=spProposal_ProjectMOI_Insert_Update&projectid='+this.projectid.toString()+"&cid="+z)
                      .map(response => response.text())
                      .subscribe(res => {
                      });

                      
                   this.http.get(this.global.api + 'api.php?action=projectclassificationupdate&projectid='+this.projectid.toString()+"&cid="+this.clss)
                      .map(response => response.text())
                      .subscribe(res => {
                      });

                      if (type==1) {
                        this.global.swalSuccess("Proposal Saved as Draft!");
                               this.dialogRef.close(5)
                      }else
                      {
                      let urlSearchParams = new URLSearchParams();
                        urlSearchParams.append("proposalid",this.proposalid.toString());
                         urlSearchParams.append('statusid', '1');
                         urlSearchParams.append('remarks', '');
                         urlSearchParams.append('userid', this.global.requestid());
                         urlSearchParams.append('type', '1');
                          let body = urlSearchParams.toString()
                          var header = new Headers();
                            header.append("Accept", "application/json");
                            header.append("Content-Type", "application/x-www-form-urlencoded");    
                            let option = new RequestOptions({ headers: header });
                       this.http.post(this.global.api + 'api.php?action=statuschange',body,option)
                            .map(response => response.text())
                            .subscribe(res => {
                            });
                              this.global.swalSuccess("Proposal has been submitted!");
                               this.dialogRef.close(6)
                            }                 //
              },error => {
                console.log(Error); 
                    this.global.swalAlertError();
               } );
          }
        if (x!='') {
          alert(x)
        }
     }
  }
  openDialogUpdate(list): void {
    const dialogRef = this.dialog.open(UpdateProjectComponent, {
      width: '99%',data:{programid:this.programid,projectid:this.projectid,progtitle:this.title,list:list}, disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      if (result==1) {
        this.getprojectlist(this.programid);   
      }
    });
  }


  planneddateyear(x){
    if (this.month1!='') {
      this.compute(x,this.month1)
    }
  }
  planneddate(x){
    if (this.year1!='') {
      this.compute(this.year1,x)
    }
  }
  compute(x,y){
    var date = new Date(y+'-15-'+x)
    date.setMonth(date.getMonth() + this.duration);
    if (date.toString()!='Invalid Date') {
      var display = date.getMonth();
      var text
      if (display>8) {
        display=display+1
        text = display.toString()
      }else{
        display=display+1
        text = '0'+display.toString()
      }
      this.month2 = text
      this.year2 =   date.getFullYear().toString()
    }
  }

maindoclabel='Choose a file...'
supdoclabel="Choose a file..."
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
}
