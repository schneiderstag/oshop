import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<any[]> {
    //return this.db.list('/categories', c => c.orderByChild('name')).valueChanges();
    //return this.db.list('/categories').valueChanges();
    return this.db.list('/categories', c => c.orderByChild('name')).snapshotChanges();
    //return this.db.list('/categories').snapshotChanges();
  }
}