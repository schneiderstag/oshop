import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products').snapshotChanges();
  }
  
  get(productId){
    //What's the difference between valueChanges() and snapshotChanges()?
    //return this.db.object('/products/' + productId).valueChanges();
    return this.db.object('/products/' + productId).valueChanges().pipe(tap(data => console.log(JSON.stringify(data))));
  }


}