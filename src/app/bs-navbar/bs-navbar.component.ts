import { async } from '@angular/core/testing';
import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  //Come back to lesson 12 Showing or hiding the admin link to add notes about async pipe and switchMap causing change detection issues in the template
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
    
  }

  async ngOnInit() {
    //In this particular case it doesn't matter as much to unsubscribe but from our other components dynamically added and removed in the DOM 
    //we should make sure to unsubscribe from each of the subscriptions they are going to lead to memory leaks.
    //To unsubscribe implement onDestroy() interface.
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items) 
        this.shoppingCartItemCount += cart.items[productId].quantity;
    });
  }

  logout() {
    this.auth.logout();
  }
}