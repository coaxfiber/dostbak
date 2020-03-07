import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';

@Component({
  selector: 'app-proposals-status-view',
  templateUrl: './proposals-status-view.component.html',
  styleUrls: ['./proposals-status-view.component.scss']
})
export class ProposalsStatusViewComponent implements OnInit {
	title;
	status
  tas
  constructor(public dialogRef: MatDialogRef<ProposalsStatusViewComponent>,@Inject(MAT_DIALOG_DATA) public data: any,) {
  	this.title=data.title;
    this.status=data.status;
  }

  ngOnInit() {
  }
	noclick(x)
	{
	  this.dialogRef.close(x)
	}
}
