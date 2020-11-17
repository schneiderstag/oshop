import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  //Come back to lesson 12 Showing or hiding the admin link to add notes about async pipe and switchMap causing change detection issues in the template
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    // In this particular case it doesn't matter as much to unsubscribe but from our other components dynamically added and removed in the DOM 
    // we should make sure to unsubscribe from each of the subscriptions they are going to lead to memory leaks.
    // To unsubscribe implement onDestroy() interface.
    // Subscribing here to avoid using the async pipe in the html template that causes infinite loop
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }
}