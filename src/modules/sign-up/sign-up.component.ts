import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DataManagerService} from '../../services/data-manager.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

export interface Profile {
  firstname: string;
  lastname: string;
  address: string;
  birthday: string;
  phone: number;
  password: string;
  email: string;
}
export const url = 'api/v1/ua';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpController: FormGroup;
  public profileInfo: Profile;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private title: Title,
              private dataManagerService: DataManagerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.signUpController = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthday: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', Validators.required],
    });
  }
  public get isSignUpFormValid(): boolean{
    return this.signUpController.valid  && this.signUpController.touched && this.passwordConfirmationValid;
  }
  public get passwordConfirmationValid(): boolean{
    return this.signUpController.controls.password.value === this.signUpController.controls.passwordConfirmation.value;
  }
  public onSubmit(): void{
    this.profileInfo = {
      firstname: this.signUpController.controls.firstname.value,
      lastname: this.signUpController.controls.lastname.value,
      birthday: this.signUpController.controls.birthday.value,
      address: this.signUpController.controls.address.value,
      email: this.signUpController.controls.email.value,
      password: this.signUpController.controls.password.value,
      phone: this.signUpController.controls.phone.value,
    };
    this.http.post(url + '/signup', this.profileInfo).subscribe((success) => {
      if (success === 0){
        this.dataManagerService.signIn({password: this.profileInfo.password, email: this.profileInfo.email})
          .subscribe((account) => {
            this.dataManagerService.$isSignedIn.next(true);
            this.dataManagerService.$profile.next(account);
            this.dataManagerService.sessionStorage();
            this.router.navigate(['../user/profile']);
            this.title.setTitle(account.firstname + ' ' + account.lastname);
          });
      }
      else{
        this.dataManagerService.$profile.next(null);
      }
    });
  }
}
