import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../login/authentication.service';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('DIAG: route.url: ' + route.url);
    console.log('DIAG: state.url: ' + state.url);
    const currentUser = this.authenticationService.currentUserValue;

    if (route.url.toString() === 'user' || route.url.toString() === 'admin') {
      // Authorization guard has to check if there is a logged in user with sufficient permissions
      // to access the guarded routes.
      if (currentUser) {
        // User has been verified as logged in
        if (route.url.toString() === 'admin' && currentUser.privilegeLevel === 'admin') {
          // If the requested route is exclusive to administrators and
          // the user currently logged in has an admin privilege level, grant the access request.
          return true;
        } else if (route.url.toString() === 'user' && currentUser.privilegeLevel === 'client') {
          // If the requested route is exclusive to client users and
          // the user currently logged in has a user privilege level, grant the access request.
          return true;
        } else {
          // Not logged in so redirect to login page with the return url
          this.router.navigate(['/login']);
          return false;
        }
      }
    } else if (route.url.toString() === 'login' || route.url.toString() === 'register' || route.url.toString() === 'recover-password') {
      // Authorization guard has to check if the user is currently logged in. If that's the case,
      // the "Login", "Register" and "Recover Password" pages are no more accessible.
      if (currentUser) {
        // Already logged in so redirect to the dashboard page.
        let arg;
        switch (currentUser.privilegeLevel) {
          case 'client':
            arg = 'user';
            break;
          case 'business owner':
            arg = 'business-owner';
            break;
          case 'admin':
            arg = 'admin';
            break;
        }
        this.router.navigate([`/${arg}`]);
        return false;
      } else {
        return true;
      }
    }
  }
}
