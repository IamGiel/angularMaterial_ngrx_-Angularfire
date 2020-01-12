import { Component, OnInit } from '@angular/core';
import { CourtLists } from '../dumm-data/courts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  courtLists = CourtLists;
  constructor() { }

  ngOnInit() {
    
  }

}
