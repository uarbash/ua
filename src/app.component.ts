import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataManagerService} from './services/data-manager.service';
import {Profile} from './modules/sign-up/sign-up.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  public  signInData;
  constructor(private dataManagerService: DataManagerService) {
  }

  public ngOnInit(): void {
    if (localStorage.getItem('email') && localStorage.getItem('password')){
      this.signInData = {email: localStorage.getItem('email'), password: localStorage.getItem('password')};
    }
    if (this.signInData){
      console.log(this.signInData);
      this.dataManagerService.signIn(this.signInData).subscribe((account: Profile) => {
        if (account.email !== 'INVALID'){
          this.dataManagerService.$isSignedIn.next(true);
          this.dataManagerService.$profile.next(account);
          this.dataManagerService.sessionStorage();
        }
        else{
          this.dataManagerService.$profile.next(null);
        }
      });
    }
  }

  public ngOnDestroy(): void {
    localStorage.clear();
    setTimeout(() => localStorage.clear(), 5000);
  }

}
