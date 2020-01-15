import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {
  breakpoint: number;
  toggleColor: string;
  toggleHeight: any;
  windowWidth: number;
  isAuth = false;
  authSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.initAuthListener();
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
    this.breakpoint = window.innerWidth < 959 ? 1 : 3;
    this.getWindowWidth();
  }
  onResize(event) {
    this.breakpoint = event.target.innerWidth < 959 ? 1 : 3;
    this.getWindowWidth();
  }
  goToHowItWorks(){
    console.log("how it works route clicked")
    this.router.navigateByUrl("/how-it-works");
  }
  goToDashBoard(){
    this.router.navigateByUrl('/dashboard');
  }
  getWindowWidth() {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth <= 599) {
      return (this.toggleHeight = "10px");
    } else {
      return (this.toggleHeight = "100%");
    }
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
