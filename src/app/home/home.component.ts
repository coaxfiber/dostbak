import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Chart} from 'chart.js';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  LineChart=[];
  BarChart=[];
  PieChart=[];

  loadcompany=1
  companyresearchcount
  myControl = new FormControl();
  optionsdiscipline
  filteredOptions: Observable<string[]>;

  company
  inputcompany=''
  constructor(private http: Http,private global: GlobalService) {
  	this.http.get(this.global.api + 'api.php?action=company_List',
         this.global.option)
            .map(response => response.json())
            .subscribe(res => {
              this.company= res;
        });

            this.companyresearch('get')
     
   }
   temp=[]
   transfer(){
   	for (var i = 0; i < this.optionsdiscipline.length; ++i) {
   		this.temp.push(this.optionsdiscipline[i].name);
   	}
   	console.log(this.temp);
   }

   getresearchcount(x)
   {
     var y = 0
     for (var i = 0; i < x.length; ++i) {
       y = parseInt(x[i].count) + y;
     }
     return y
   }

	private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.temp.filter(option => option.toLowerCase().includes(filterValue));
  	}

    companyresearch(x)
    {
      if (x=='get') {
       this.http.get(this.global.api + 'api.php?action=spRPTResearch_CountByCompany',
         this.global.option)
            .map(response => response.json())
            .subscribe(res => {
              this.companyresearchcount = this.getresearchcount(res)
              //console.log(res)
        });
      }else
     this.http.get(this.global.api + 'api.php?action=spRPTResearch_CountByCompany2&id='+x,
         this.global.option)
            .map(response => response.json())
            .subscribe(res => {
              this.companyresearchcount= 0
              if (res[0]!=undefined) {
                this.companyresearchcount = res[0].count
              }
        });
    }

  ngOnInit() {
  	this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
}
