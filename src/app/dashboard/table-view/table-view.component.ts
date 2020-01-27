import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FetchDataService } from 'src/app/service/fetch-data-service.service';
import { AuthService } from 'src/app/service/auth.service';
import { Courts } from 'src/app/models/court.model';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})

export class TableViewComponent implements OnInit, AfterViewInit {
  displayedColumns_: string[] = ['name', 'availability'];
  dataSource_ = ELEMENT_DATA;
  tableHeaders = ['1', '2', '3', '4', '5', '6', '7', '8'];

  courtData; 
  courtDetails:any = [];
  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>(null);
  dateNow;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  id:any;
  constructor(
    private _location: Location,
    private router: Router,
    private r :ActivatedRoute,
    private db: AngularFirestore,
    private fetchDataService: FetchDataService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    // console.log(this.dataSource);
    let time = new Date().getTime();
    let date = new Date(time);

    this.dateNow = date.toString();
    // console.log(this.dateNow)

    this.fetchDataService.courtListsChanged.subscribe(data => {
      this.r.params.subscribe(data => {
        // console.log(data)
        this.id = data.id;
      })
      console.log(data);
      data.filter(x => x.id === this.id).map(x => {
        console.log("tis x " + JSON.stringify(x.details))
        this.courtData = x.details;
        // for (var i in x.details) {
        //   var key = i;
        //   var val = x.details[i];
        //   for (var j in val) {
        //     var sub_key = j;
        //     var sub_val = val[j];
        //     console.log(sub_key);
        //   }
        // }
        // this.displayedColumns = Object.keys(this.courtData);
        // this.courtDetails.push(this.courtData.details)
        // console.log(this.displayedColumns)
      });

      this.dataSource = new MatTableDataSource<any>(this.courtData);
    })
    this.dataSource.paginator = this.paginator;
    this.fetchCourtLists();
  }

  ngAfterViewInit(){
   
  }

  fetchCourtLists() {
    this.fetchDataService.fetchAllCourtLists();
  }

  doFilter(event){
    console.log(event)
  }

  backClicked() {
    this._location.back();
  }

}
