import {Inject,  Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
const swal = Swal;

@Injectable()
export class GlobalService {
	token: any;
  api = "http://localhost/backend-dost/";
  //api = "http://usl.edu.ph/pages/dost/dashboard/backend-dost/";
	header = new Headers();
  option:any;

  user:any;
  userid=1;
  useraccess

   researchid;
   researchtitle;
   researchabstract;
   researchlevel;

   injectid

   company
   agency
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,private router: Router,private http: Http) { 	
    if(this.storage.get('token')!=null){
      this.requestToken();
    }
    this.requestToken();
  }

  requestemail(){return this.storage.get('email');}
  requestid(){return this.storage.get('id');}

  setemail(val1,val2){
     this.storage.set('email',val1);
     this.storage.set('id',val2);
     this.userid = val2;
  }

  requestToken(){
    this.header.append("Content-Type", "application/json");
  	this.option = new RequestOptions({ headers: this.header });
  }

  swalAlert(title,text,type)
  {
    swal(
          title,
           text,
           type
          )
  }


  swalLoading(val){
     swal({
       title: val,allowOutsideClick: false,
      });
    swal.showLoading();
  }
  swalClose(){
    swal.close();
  }


  swalAlertError()
  {
   swal('Oops...', 'Connection Error!', 'error');
  }

  setSession(val1,val2,val3,val4){
    this.storage.set('username',val1);
    this.storage.set('password',val2);
    this.storage.set('appid',val3);
    this.storage.set('apppword',val4);
  }

  getSession(){
    return this.storage.get('username');
  }
  getSessionp(){
    return this.storage.get('password');
  }

  removeSession(){
    this.storage.remove('username');
    this.storage.remove('id');
    this.storage.remove('email');
    this.storage.remove('password');
  }
  
  logout(){
    let timerInterval
    swal({
        allowOutsideClick: false,
        title: 'Auto close alert!',
        html: 'You will be Logged out from the system.',
        timer: 2000,
        onOpen: () => {
          swal.showLoading()
          timerInterval = setInterval(() => {
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.timer
        ) {
          this.removeSession();
          this.router.navigate(['../login']);
        }
      })
  }

  swalSuccess(bat){
                  swal({
                    type: 'success',
                    title: bat,
                    showConfirmButton: false,
                    timer: 1500
                  })
  }
  swalinfo(bat){

   swal('', bat);
  }
}
