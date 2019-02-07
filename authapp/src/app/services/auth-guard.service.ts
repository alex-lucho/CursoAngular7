import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    if (this.auth.isAuthenticated()) {
      console.log('el Guard paso!');
      return true;
    } else {
      console.error('Boqueado por el Guard');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
