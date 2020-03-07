import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';

@Component({
  selector: 'app-research-status',
  templateUrl: './research-status.component.html',
  styleUrls: ['./research-status.component.scss']
})
export class ResearchStatusComponent implements OnInit {

	title;
	status
  tas
  constructor(public dialogRef: MatDialogRef<ResearchStatusComponent>,@Inject(MAT_DIALOG_DATA) public data: any,) {
  	this.title=data.title;
    this.status=data.status;
    console.log(data.status)
  }

  ngOnInit() {
  }
	noclick(x)
	{
	  this.dialogRef.close(x)
	}
}
