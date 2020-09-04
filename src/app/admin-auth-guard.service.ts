import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({ 
  providedIn: 'root' 
})
export class AdminAuthGuard implements CanActivate {
  //private isAdmin: boolean;
  constructor(private auth: AuthService, private userService: UserService) { }

  // canActivate(): Observable<boolean> {
  //   // Maps app-user observable to a boolean observable which is determined based on the value of isAdmin property
  //   // and switches it to the new observable
  //   //console.log(this.auth.appUser$.pipe(map(appUser => appUser.isAdmin)));
  //   this.auth.appUser$.pipe(map(appUser => appUser.isAdmin)).subscribe(console.log); //displays isAdmin in the console

  //   return this.auth.appUser$.pipe(map(appUser => appUser.isAdmin));
  // }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Maps app-user observable to a boolean observable which is determined based on the value of isAdmin property
    // and switches it to the new observable
    //console.log(this.auth.appUser$.pipe(map(appUser => appUser.isAdmin)));
    //this.auth.appUser$.pipe(map(appUser => appUser.isAdmin)).subscribe(console.log); //displays isAdmin in the console
    //this.auth.appUser$.pipe(map(appUser => appUser.isAdmin)).subscribe((isAdmin) => { console.log('Admin User:', isAdmin); }); //displays isAdmin in the console
    //this.auth.appUser$.subscribe(appUser => this.isAdmin = appUser.isAdmin); 
    //console.log(this.isAdmin);

    return this.auth.appUser$.pipe(map(appUser => appUser.isAdmin));
    //return this.isAdmin;
  }

  // canActivate(): Observable<boolean> {
  //   return this.auth.user$.pipe(switchMap(user => this.userService.get(user.uid).pipe(map((appUser: any) => appUser.isAdmin))));
  // }
}