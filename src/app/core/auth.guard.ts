import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService} from '../login/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    console.log('DIAG: route.url: ' + route.url);
    console.log('DIAG: state.url: ' + state.url);
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
        // The current user's privilege level does not match the requested route's required privilege level,
        // so the request is denied.
        // tslint:disable-next-line:max-line-length
        // TODO Redirect the user to a general "Error" page component and use alert service to inform him about the route change request denial.
        return false;
      }
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
