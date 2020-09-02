import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ 
  providedIn: 'root' 
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService) {}

  canActivate(): Observable<boolean> {
    // Maps app-user observable to a boolean observable which is determined based on the value of isAdmin property
    // and switches it to the new observable
    //console.log(this.auth.appUser$.pipe(map(appUser => appUser.isAdmin)));
    return this.auth.appUser$.pipe(map(appUser => appUser.isAdmin));
  }

  // canActivate(): Observable<boolean> {
  //   return this.auth.user$.pipe(switchMap(user => this.userService.get(user.uid).pipe(map((appUser: any) => appUser.isAdmin))));
  // }
}