import { Component, OnInit } from "@angular/core";
import { CourtLists } from "../dumm-data/courts";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, Subscription } from "rxjs";
import "rxjs/add/operator/map";
import { map } from "rxjs/operators";
import { OCT } from "@angular/material";

import { Courts } from "../models/court.model";
import { FetchDataService } from "../service/fetch-data-service.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  courtLists = CourtLists;
  courts: Courts [];
  courtListsSubscription: Subscription;
  constructor(
    private router: Router,
    private db: AngularFirestore,
    private fetchDataService: FetchDataService
  ) {}

  ngOnInit() {
    this.courtListsSubscription = this.fetchDataService.courtListsChanged.subscribe(
      courtlists => (this.courts = courtlists)
    );
    this.fetchCourtLists();
  }

  fetchCourtLists() {
    this.fetchDataService.fetchAllCourtLists();
    console.log(this.courts);
  }

  goHome() {
    this.router.navigateByUrl("/");
  }
}
