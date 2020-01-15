import { Component, OnInit, OnDestroy } from "@angular/core";
import { CourtLists } from "../dumm-data/courts";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, Subscription } from "rxjs";
import "rxjs/add/operator/map";
import { map } from "rxjs/operators";
import { OCT } from "@angular/material";

import { Courts } from "../models/court.model";
import { FetchDataService } from "../service/fetch-data-service.service";
import { AuthService } from '../service/auth.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  courts: Courts [];
  courtListsSubscription: Subscription;
  isAuth = false;
  authSubscription: Subscription;

  constructor(
    private router: Router,
    private db: AngularFirestore,
    private fetchDataService: FetchDataService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
    this.courtListsSubscription = this.fetchDataService.courtListsChanged.subscribe(
      courtlists => (this.courts = courtlists)
    );
    this.fetchCourtLists();
  }

  fetchCourtLists() {
    this.fetchDataService.fetchAllCourtLists();
  }

  goHome() {
    this.router.navigateByUrl("/");
  }
  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(){
    this.courtListsSubscription.unsubscribe()
  }
}
