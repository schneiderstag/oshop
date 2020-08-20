import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ 
  providedIn: 'root' 
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}

  canActivate(): Observable<boolean> {
    // Maps app-user observable to a boolean observable which is determined based on the value of isAdmin property
    // and switches it to the new observable
    return this.auth.appUser$.pipe(map(appUser => appUser.isAdmin));

    // return this.auth.user$
    // .switchMap(user => this.userService.get(user.uid))
    // .map(appUser => appUser.isAdmin)
    //);

    // return this.auth.user$
    //     .pipe(
    //         switchMap(user => this.userService.get(user.uid)),
    //         map(appUser => appUser.isAdmin)
    //     );
    
    // return this.auth.user$.pipe(
    //   switchMap(user => this.userService.get(user.uid).valueChanges()),
    //   map (appUser => appUser.isAdmin)
    //)
  }
}