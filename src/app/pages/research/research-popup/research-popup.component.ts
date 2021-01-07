import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import { GlobalService } from './../../../global.service';
@Component({
  selector: 'app-research-popup',
  templateUrl: './research-popup.component.html',
  styleUrls: ['./research-popup.component.css']
})
export class ResearchPopupComponent implements OnInit {
	url
  constructor(public global: GlobalService,private sanitizer: DomSanitizer,public dialog: MatDialog,public dialogRef: MatDialogRef<ResearchPopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
    this.global.swalClose()
    if (this.global.requestid()!=null) {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.global.api+'getpdf.php?data='+this.data.x)
    }
  	
  }

  onNoClickclose(): void {
       this.dialogRef.close(undefined);
  }
}
