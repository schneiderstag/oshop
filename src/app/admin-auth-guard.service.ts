import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}

  //Mosh Code (Older Angular Version):
  // canActivate(): Observable<boolean> { 
  //   return this.auth.user$
  //     .pipe(switchMap(user => this.userService.get(user.uid)))
  //     .pipe(map(appUser => appUser.isAdmin));
  // }

  //Solution 1
  // canActivate(): Observable<boolean> {
  //   return this.auth.user$.pipe(
  //     switchMap((user) => this.userService.get(user.uid).valueChanges()),
  //     map((appUser) => appUser.isAdmin)
  //   );
  // }

  //Solution 2
  canActivate(): Observable<boolean> {
    return this.auth.user$
      .pipe(switchMap((user) => this.userService.get(user.uid).valueChanges()))
      .pipe(map((appUser) => appUser.isAdmin));
  }
}