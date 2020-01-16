import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FetchDataService } from 'src/app/service/fetch-data-service.service';
import { AuthService } from 'src/app/service/auth.service';
import { Courts } from 'src/app/models/court.model';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})

export class TableViewComponent implements OnInit, AfterViewInit {
  courtData:Courts; 
  courtDetails:any = [];
  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>(null);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  id:any;
  constructor(
    private router: Router,
    private r :ActivatedRoute,
    private db: AngularFirestore,
    private fetchDataService: FetchDataService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.fetchDataService.courtListsChanged.subscribe(data => {
      this.r.params.subscribe(data => {
        console.log(data)
        this.id = data.id;
      })
      console.log(this.id);
      data.filter(x => x.id === this.id).map(x => {
        this.courtData = x;
        this.displayedColumns = Object.keys(this.courtData);
        this.courtDetails.push(this.courtData.details)
        console.log(this.displayedColumns)
      });
      console.log(this.courtDetails)
      this.dataSource = new MatTableDataSource<any>(this.courtDetails);
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

}
