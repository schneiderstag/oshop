import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent {
  //Come back to lesson 12 Showing or hiding the admin link to add notes about async pipe and switchMap causing change detection issues in the template
  appUser: AppUser;
  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser); //add comments about memory leaks and unsubscribe
  }

  logout() {
    this.auth.logout();
  }
}