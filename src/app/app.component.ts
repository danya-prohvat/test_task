import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit  {
  constructor(
    private router: Router,
  ) {}
  title = 'angular_test';

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (!token) this.router.navigate(['login']);
  }
}
