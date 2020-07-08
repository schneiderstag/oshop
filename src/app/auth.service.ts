import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>; 
  //$ sign is a convention to mark a variable as observable
  
  //This is not a proper abstraction. I'm leaking my implementation detail to the outside. The type of the user field is an observable of firebase.user.
  //If you want to be a purist then you need to define your own user class and write some extra code to map the firebase.user object to your user objects.
  //For the purpose of this project this is an unnecessary complexity because i'm using and building this app for firebase and this is the scope of the application.
  //What I need to take away here is that adding all these extra abstractions is going to increase the complexity of the application.
  //I'm adding this abstraction AuthService simply to enable testability of our component and also have better separation of concern in the code.

  constructor(private afAuth: AngularFireAuth) { 
    //Use an observable to deal with asynchronous stream of data so it unsubscribe from it automatically. 
    //It's not like dealing with an http where angular terminates or complete the observable.
    this.user$ = afAuth.authState; //$ sign is a convention to mark a variable as observable
  } 

  login() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
