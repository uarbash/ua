import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {DataManagerService} from './data-manager.service';

interface CanActivate {
  canActivate(): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService implements CanActivate{

  constructor(private router: Router, private dataManagerService: DataManagerService) { }
  canActivate(): boolean {
    if (!this.dataManagerService.$isSignedIn.getValue())  {
      this.router.navigate(['user/signin']);
      return false;
    }
    return true;
  }
}
