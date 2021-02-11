import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Router } from '@angular/router';
import { GlobalService } from './../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog,MatDialogRef } from '@angular/material';
import { NewProposalComponent } from './../proposal/new-proposal/new-proposal.component';
import { NewResearchComponent } from './../research/new-research/new-research.component';

import { EditProfileComponent } from './../profile/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './../profile/change-password/change-password.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
		panelOpenState: boolean = false;
    image:any = 'assets/noimage.jpg';
    id:any;
    name:any;
    user={fname:'',surname:'',mname:'',ext:'',sex:'',agency:'',address:'',telno:'',companyid:'',appname:'',companyname:'',roleid:''}
    
  selectedIndex=0;
inputcompany
controlpanel
//pagesre
res
more="More"
more2="More"
  constructor(public dialog: MatDialog, private domSanitizer: DomSanitizer,public global: GlobalService,private http: Http,private route: ActivatedRoute, private router: Router) {
  	
    if (this.global.requestid()==null) {
              this.router.navigate(['../main',{outlets:{div:'Company-Management'}}]);
    }
    this.id = this.global.requestid();
     
     this.global.swalLoading('Loading User Information');
     this.http.get(this.global.api + 'api.php?action=getuserinfo&id='+this.global.requestid(),
         this.global.option)
            .map(response => response.json())
            .subscribe(res => {
              this.user= res;
               this.global.user=res;
               this.http.get(this.global.api + 'api.php?action=spUserViewDomain_Company_By_Username&email='+this.global.requestemail(),
                   this.global.option)
                      .map(response => response.json())
                      .subscribe(res => {
                        this.res=res[0];
                      this.http.get(this.global.api+'api.php?action=spUserAccessLevel_By_Username&email='+this.global.requestemail(),this.global.option)
                         .map(response => response.json())
                        .subscribe(res => {
                          if (res.length==0) {
                            this.router.navigate(['../login']);
                          }
                          this.global.useraccess=this.res;
                          this.assign(res);
                              //console.log(res)
                              this.http.get(this.global.api+'api.php?action=company_List',this.global.option)
                              .map(response => response.json())
                              .subscribe(res => {
                               this.global.company = res;
                               this.http.get(this.global.api + 'api.php?action=FundingAgency_List',
                                     this.global.option)
                                        .map(response => response.json())
                                        .subscribe(res => {
                                          this.global.fundingagency= res;
                                           this.global.swalClose();
                                    });
                              });
                      });
                  });
        },error => {
                                console.log(Error); 
                                    this.global.swalAlertError();
                               } );


         this.http.get(this.global.api + 'api.php?action=spUser_Select&email='+this.global.requestemail(),
                   this.global.option)
                      .map(response => response.json())
                      .subscribe(res => {  
                        this.inputcompany = res.companyname
                        this.global.agency = res.companyname
                        this.inputcompanyid = res.company
                        this.global.inputcompanyid= res.company
                  });

   }
   tabbing=0
   inputcompanyid
  select(x) {
      this.selectedIndex = x; 
      this.tabbing = x;
  }

  userfunc(){
      this.http.get(this.global.api + 'api.php?action=getuserinfo&id='+this.global.requestid(),
         this.global.option)
            .map(response => response.json())
            .subscribe(res => {
              this.user= res;
               this.global.user=res;
                });
  }

  proposal = 0;
  research = 0;
  usermanagement = 0;
  proposalapproval = 0;
  researchapproval = 0;
  assign(res){
     for( var i = 0; i < res.length; i++){ 
          if ( res[i].moduleid === '3') {
              this.usermanagement = 1;
          }else
          if ( res[i].moduleid === '2') {
              this.research = 1;
          }else
          if ( res[i].moduleid === '1') {
              this.proposal = 1;
          }else
          if ( res[i].moduleid === '4') {
              this.proposalapproval = 1;
          }else
          if ( res[i].moduleid === '5') {
              this.researchapproval = 1;
          }else
          if ( res[i].moduleid === '6') {
              this.controlpanel = 1;
          }else
          if ( res[i].moduleid === '7') {
              this.controlpanel = 1;
          }
          
    }
    
       this.router.navigate(['../main',{outlets:{div:'home'}}]);
    // if (this.controlpanel==1||this.usermanagement==1)
    //    this.router.navigate(['../main',{outlets:{div:'home'}}]);
    //  else if (this.proposalapproval==1||this.researchapproval==1)
    //    this.router.navigate(['../main',{outlets:{div:'home'}}]);
    //  else if (this.research==1)
    //    this.router.navigate(['../main',{outlets:{div:'researches-Draft'}}]);
    //  else if (this.proposal==1)
    //    this.router.navigate(['../main',{outlets:{div:'proposals'}}]);
  }


  openDialogUpdate(): void {
    const dialogRef = this.dialog.open(NewProposalComponent, {
      width: '99%',data:{company:this.inputcompanyid}, disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      if (result==5) {
        this.router.navigate(['../main',{outlets:{div:'proposals-Draft'}}]); 
      }
      if (result==6) {
        this.router.navigate(['../main',{outlets:{div:'proposals-Pending'}}]); 
      }
    });
  }  
  openDialogchangepassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '400px',data:{id:this.global.requestid}, disableClose: false });

    dialogRef.afterClosed().subscribe(result => {
      this.userfunc();
        if (result!=undefined) {

      }
    });
  }  

  openDialogUpdate2(): void {
    const dialogRef = this.dialog.open(NewResearchComponent, {
      width: '99%',data:{programid:'none'}, disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result==2) {
        this.global.researchstat = "Draft"
        this.router.navigate(['../main',{outlets:{div:'Research'}}]);
      }
      if (result==3) {
        this.global.researchstat = "Pending"
        this.router.navigate(['../main',{outlets:{div:'Research'}}]);
      }
    });
  }

  openDialogeditprofile(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '750px',data:{user:this.user,company:this.inputcompanyid}, disableClose: false });

    dialogRef.afterClosed().subscribe(result => {
      this.userfunc();
      this.http.get(this.global.api + 'api.php?action=spUser_Select&email='+this.global.requestemail(),
                   this.global.option)
                      .map(response => response.json())
                      .subscribe(res => {  
                        this.inputcompany = res.companyname
                        this.inputcompanyid = res.company
                  });
      if (result!=undefined) {
      }
    });
  }


  ngOnInit() {
    if (this.global.getSession()==null) {
      this.global.logout();
    }
  }

  clickevent(event){
    if(this.more=="More"){
      this.more="Less"
    }else
    this.more="More"
  }
  clickevent2(event){
    if(this.more2=="More"){
      this.more2="Less"
    }else
    this.more2="More"
  }
}
