import { Product } from './models/product';
import { AngularFireDatabase, SnapshotAction } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db.list<Product>('/products').snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({ key: a.key, ...a.payload.val() }))
        )
      );
  }
  
  // getAll()  {
  //   return this.db.list('/products').snapshotChanges();
  // }

  get(productId: number) {
    //What's the difference between valueChanges() and snapshotChanges()?
    //return this.db.object('/products/' + productId).valueChanges();
    return this.db.object('/products/' + productId).valueChanges()
      .pipe(
        tap(data => console.log(JSON.stringify(data)))
      );
  }

  update(productId: number, product: Product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();    
  }
}