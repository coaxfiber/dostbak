import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import { HostListener } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
const swal = Swal;

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
	username:any="admin@gmail.com";
	password:any="admin1";
  key = 1
  header = new Headers();
  user
  disabled = false
  private loggedIn: boolean;
  constructor(private authService: SocialAuthService,private http: Http, public global: GlobalService,private router: Router) { 
     this.global.activepage='search'
    if (window.location.href.includes("registration")) {
      this.router.navigate(['registration']);
    }else
    if (this.global.getSession()!=null) {
      this.username=this.global.getSession();
      this.password=this.global.getSessionp();
      this.login();
    }
  }

@HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
     if (event.key=='Enter' && !(swal.isVisible())) {
      this.login()
      }
  }

  login2(){this.router.navigate(['../main']);}

  login(){
    if (this.username == undefined || this.username ==  ''  || this.password == undefined  || this.password ==  '') {
      swal(
          '',
           'Username and Password are Required!',
           'info'
          )
    }
    else{
      if (this.username==undefined) {
        this.username = "";
      } if (this.password==undefined) {
        this.password = "";
      }
      swal({
       title: 'Logging In...',allowOutsideClick: false,
      });
      swal.showLoading();
                    let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("username",this.username);
                    urlSearchParams.append('password', this.password);
                    urlSearchParams.append('appname', 'CVRDKMS');
                    urlSearchParams.append('appsecret', 'admin');
                  let body = urlSearchParams.toString()
      var header = new Headers();
                  header.append("Accept", "application/json");
                  header.append("Content-Type", "application/x-www-form-urlencoded");    
                  let option = new RequestOptions({ headers: header });
                  
       this.http.post(this.global.api + 'api.php?action=login',
       body,option)
          .map(response => response.json())
          .subscribe(res => {
             swal.close();
               console.log(res)
             if (res.id==null) {
               swal(
                  '',
                   'Incorrect Username or Password',
                   'info'
                  )
             }else{
               if (res.confirmed == '0') {
                 this.lockaccount(res);
               }else {
                 this.global.setemail(res.email,res.id);
                 this.global.setSession(this.username,this.password,'CVRDKMS','admin')
                 this.router.navigate(['main']);
               }
             }
          },error => {
            console.log(Error); 
                this.global.swalAlertError();
           } );
    }
  }
  ngOnInit() {
  }

  lockaccount(res){
        swal({
          title: 'Please enter the code sent your email address.',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Log-in',
          showLoaderOnConfirm: true,
          allowOutsideClick: () => !Swal.isLoading(),
          preConfirm: (login) => {
                console.log('test')
                //login = null //remove 
                if (true) {
                 this.global.setemail(res.email,res.id);
                 this.global.setSession(this.username,this.password,'CVRDKMS','admin')
                  this.http.get(this.global.api+'api.php?action=spUser_EmailConfirmationDetail_Update&id='+res.id,this.global.option)
                  .map(response => response.json())
                  .subscribe(res => {
                     this.router.navigate(['main']);
                  },Error=>{
                    this.global.swalAlertError();
                  });
                  // code...
                }
            }
        })
  }

signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.loggedIn = (user != null);
      if (user!=null) {
        this.username = user.email
         this.global.email = user.email

          swal({
           title: 'Logging In...',allowOutsideClick: false,
          });
          swal.showLoading();
      
            let urlSearchParams = new URLSearchParams();
            urlSearchParams.append("username",this.username);
            urlSearchParams.append('password', this.password);
            urlSearchParams.append('appname', 'CVRDKMS');
            urlSearchParams.append('appsecret', 'admin');
          let body = urlSearchParams.toString()
          var header = new Headers();
                      header.append("Accept", "application/json");
                      header.append("Content-Type", "application/x-www-form-urlencoded");    
                      let option = new RequestOptions({ headers: header });
                      
           this.http.post(this.global.api + 'api.php?action=login',
           body,option)
              .map(response => response.json())
              .subscribe(res => {
                swal.close()
                 if (res.id==null) {
                     this.global.removeSession()
                     this.global.email = user.email
                     this.router.navigate(['registration']);
                 }else{
                   // if (res.confirmed == '0') {
                   //   this.lockaccount(res);
                   // }else 
                   {
                     this.global.setemail(res.email,res.id);
                     this.global.setSession(this.username,this.password,'CVRDKMS','admin')
                     this.router.navigate(['main']);
                   }
                 }
              },error => {
                console.log(Error); 
                    this.global.swalAlertError();
               } );
          }else{
            //this.global.swalAlert("Goolge Login Failed!",'Please Check your Internet Connectivity to proceed.','warning')
          }
    });
  }
  Cookies(){
    this.global.swalAlert('','<div class=\'no-overflow\' style=\'font-weight: normal;font-size: 15px;\'><p>1 cookie(<i>Session cookie</i>) is used on this site:</p><p>You must allow this cookie in your browser to provide continuity and to remain logged in when browsing the site. When you log out or close the browser, this cookie is destroyed (in your browser and on the server).</p><p>Note: Cookies are not enabled in incognito mode (Don\'t use incognito mode in your browser).</p></div> ', 'info')
  }

}
