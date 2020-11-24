import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Order } from 'shared/models/order';
//import { Order } from './models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  getOrders(): Observable<Order[]> {
    return this.db.list<Order>('/orders').snapshotChanges()
      .pipe(
        map(orders =>
          orders.map(o => ({ key: o.key, ...o.payload.val() }))
        )
      );
  }

  getOrdersByUser(userId: string): Observable<Order[]> {
    return this.db.list<Order>('/orders', query => query.orderByChild('userId').equalTo(userId))
      .snapshotChanges()
      .pipe(
        map(orders =>
          orders.map(o => ({ key: o.key, ...o.payload.val() })))
      );
  }

  getOrderById(id: string): Observable<Order> {
    // this.db.object<Order>('/orders/' + id).valueChanges().subscribe(console.log);
    return this.db.object<Order>('/orders/' + id).valueChanges();
  }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  // getOrders() {
  //   //return this.db.list<Order>('/orders').valueChanges();
  //   return this.db.list('/orders').valueChanges();
  // }

  // getOrdersByUser(userId: string) {
  //   return this.db.list('/orders', query => query.orderByChild('userId').equalTo(userId))
  //     .valueChanges();
  // }
}
