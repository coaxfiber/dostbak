import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Chart} from 'chart.js';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
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



    public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor(private http: Http,public global: GlobalService) {
     this.global.activepage='search'
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
