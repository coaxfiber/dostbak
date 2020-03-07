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
  constructor(private http: Http, private global: GlobalService,private router: Router) { 
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
}
