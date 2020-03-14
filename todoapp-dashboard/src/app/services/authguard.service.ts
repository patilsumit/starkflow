import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {BackendapiService} from './backendapi.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private apiServices: BackendapiService, private route: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.apiServices.isLoggedIn()) {
      this.route.navigateByUrl('/users/signin');
      this.apiServices.logout();
      return false;
    }
    return true;
  }
}
