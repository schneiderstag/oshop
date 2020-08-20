import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
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
    //In this particular case it doesn't matter as much to unsubscribe but from our other components dynamically added and removed in the DOM 
    //we should make sure to unsubscribe from each of the subscriptions they are going to lead to memory leaks.
    //To unsubscribe implement onDestroy() interface.
    auth.appUser$.subscribe(appUser => this.appUser = appUser); 
  }

  logout() {
    this.auth.logout();
  }
}