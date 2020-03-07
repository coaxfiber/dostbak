import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalService } from './../../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';

@Component({
  selector: 'app-research-pdf',
  templateUrl: './research-pdf.component.html',
  styleUrls: ['./research-pdf.component.scss']
})
export class ResearchPdfComponent implements OnInit {

pdf
link;

  constructor(private http: Http,private global: GlobalService,private domSanitizer: DomSanitizer,public dialogRef: MatDialogRef<ResearchPdfComponent>,@Inject(MAT_DIALOG_DATA) public data: any,) {
  	if (data.pdf!=undefined) {
  	this.pdf = data.pdf;
  	this.link = this.global.api+ "getpdf.php?data="+this.pdf;
  	this.link = this.domSanitizer.bypassSecurityTrustResourceUrl(this.link)
  	}
  	}
noclick(x)
	{
	  this.dialogRef.close(0)
	}
	getlink(){
		return this.link
	}
  ngOnInit() {
  }
  download(){
  	 let headers = new Headers();
                    headers.append("Accept", "application/pdf");    
                    let option2 = new RequestOptions({ headers: headers });
      return this.http.get(this.link,option2);
  }

}
