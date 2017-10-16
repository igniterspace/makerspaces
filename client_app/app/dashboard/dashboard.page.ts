import { Component } from '@angular/core';
import { Router, Route } from "@angular/router";

@Component({
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.css']
})
export class DashboardPage {

  constructor(private router: Router) {}

  ngOnInit() {
    //console.log('configured routes: ', this.router.config);
  }
}
