import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username!: string | null;

  constructor(private router: Router) { }

  ngOnInit() {
    // Retrieve username from local storage
    this.username = localStorage.getItem('username');
    if (!this.username) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    // Clear local storage and navigate back to login page
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }
}
