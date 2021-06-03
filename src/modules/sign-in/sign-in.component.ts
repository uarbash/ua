import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataManagerService} from '../../services/data-manager.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Profile, url} from '../sign-up/sign-up.component';
import {Title} from '@angular/platform-browser';

export interface ProfileSignIn {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public signInController: FormGroup;
  public signInInfo: ProfileSignIn;
  public wrongData = false;
  constructor(private fb: FormBuilder,
              private dataManagerService: DataManagerService,
              private http: HttpClient,
              private title: Title,
              private router: Router) { }

  ngOnInit(): void {
    this.signInController = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  public get isSignInFormValid(): boolean{
    return this.signInController.valid  && this.signInController.touched;
  }

  public onSubmit(): void{
    this.signInInfo = {
      email: this.signInController.controls.email.value,
      password: this.signInController.controls.password.value
    };
    this.dataManagerService.signIn(this.signInInfo).subscribe((account: Profile) => {
      if (account.email !== 'INVALID'){
        this.dataManagerService.$isSignedIn.next(true);
        this.dataManagerService.$profile.next(account);
        this.dataManagerService.sessionStorage();
        this.router.navigate(['../user/profile']);
        this.wrongData = false;
        this.title.setTitle(account.firstname + ' ' + account.lastname);
      }
      else{
        this.dataManagerService.$profile.next(null);
        this.wrongData = true;
      }
    });
  }
}
