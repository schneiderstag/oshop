import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    //return this.db.list('/categories', c => c.orderByChild('name')).valueChanges();
    //return this.db.list('/categories').valueChanges();
    return this.db.list('/categories', c => c.orderByChild('name')).snapshotChanges();
    //return this.db.list('/categories').snapshotChanges();
  }
}