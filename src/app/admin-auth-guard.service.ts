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
  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree { // The method can return an observable, a promise or a simple boolean value.
    // Maps app-user observable to a boolean observable which is determined based on the value of isAdmin property and switches it to the new observable
    return this.auth.appUser$.pipe(map(appUser => appUser.isAdmin));
  }  
}
  //console.log(this.auth.appUser$.pipe(map(appUser => appUser.isAdmin)));
    //this.auth.appUser$.pipe(map(appUser => appUser.isAdmin)).subscribe(console.log); //displays isAdmin in the console
    //this.auth.appUser$.pipe(map(appUser => appUser.isAdmin)).subscribe((isAdmin) => { console.log('Admin User:', isAdmin); }); //displays isAdmin in the console
    //this.auth.appUser$.subscribe(appUser => this.isAdmin = appUser.isAdmin); 
    //console.log(this.isAdmin);