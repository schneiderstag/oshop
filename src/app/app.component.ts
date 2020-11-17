import { UserService } from 'shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Organic Shop';

  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    auth.user$.subscribe(user => {
      if (!user) return;
    
      userService.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        if(!returnUrl) return;
        
        localStorage.removeItem('returnUrl'); //delete this url from local storage to avoid taking the user to home every time the page is reloaded.
        router.navigateByUrl(returnUrl);
    });
  }
}