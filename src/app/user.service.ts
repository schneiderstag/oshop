import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database'; //FirebaseObjectObservable changed to AngularFireObject
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    // Using update() not set() to avoid overwriting every time the user logins
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<any>{
    //this.db.object('/users/' + uid).valueChanges().subscribe(console.log); //displays user in the console

    return this.db.object('/users/' + uid).valueChanges();
  }

  // usersRef: AngularFireList<any>;    // Reference to User data list, it's an Observable
  // userRef: AngularFireObject<any>;   // Reference to User object, it's an Observable too

  // Fetch Single Object
  // GetUser(uid: string) {
  //   this.userRef = this.db.object('users/' + uid);
  //   return this.userRef;
  // }

  // // Fetch Users List
  // GetUsers() {
  //   this.usersRef = this.db.list('users');
  //   return this.usersRef;
  // }
  
  //Original:
  // get(uid: string): Observable<any> {
  //   return this.db.object('/users/' + uid).valueChanges();
  // }

  // get(uid: string): AngularFireObject<AppUser> {
  //   return this.db.object('/users/' + uid);
  // }

  // get(uid: string): AngularFireObject<AppUser> {
    // this.db.object('/users/' + uid)
    // .valueChanges()
    // .subscribe(res => {
    //     console.log(res)
    // })

    // this.db.object('/users/' + uid)
    // .valueChanges()
    // .subscribe(res => {
    //   console.log(res);
    //   return res;
    // });

    //console.log(this.r)

    // let test = this.db.object('/users/' + uid).valueChanges();
    // console.log(test)
    // console.log(this.db.object('/users/' + uid).valueChanges());
    // return this.db.object('/users/' + uid);
  // }

  // get(uid: string): Observable<any> {
  //   return this.db.object('/users/' + uid).valueChanges();
  //   }
}