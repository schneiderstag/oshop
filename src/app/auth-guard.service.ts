import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators'

@Injectable({ 
  providedIn: 'root' 
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(router, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(map(user => {
      if (user) return true;

      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }));
  }

  // canActivate(route, state: RouterStateSnapshot) {
  //   // with RouterStateSnapshot we can get the url that the user tried to access when this AuthGuard kicked in
  //   return this.auth.user$
  //     .pipe(map(user => {
  //       // tslint:disable-next-line:max-line-length
  //       // we're calling the map operator and transform this observable from a user object into a boolean and angular will internally subscribe to this observable and remove the subscription later
  //       if(user) { return true; }

  //       this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
  //       // query parameter that determines the return url
  //       return false;
  //   }));
  // }


}
