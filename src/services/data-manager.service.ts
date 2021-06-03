import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Profile, url} from '../modules/sign-up/sign-up.component';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  constructor(private http: HttpClient) {
  }

  public $isSignedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public $profile: BehaviorSubject<Profile> = new BehaviorSubject(null);
  public signIn(signInInfo): Observable<Profile>{
    return this.http.post<Profile>(url + '/signin', signInInfo);
  }
  public sessionStorage(): void{
    localStorage.setItem('email', this.$profile.getValue().email);
    localStorage.setItem('password', this.$profile.getValue().password);
  }
}
