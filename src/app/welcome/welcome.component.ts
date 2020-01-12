import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
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
}
