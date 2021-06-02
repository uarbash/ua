import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profile, url} from '../sign-up/sign-up.component';
import {HttpClient} from '@angular/common/http';
import {DataManagerService} from '../../services/data-manager.service';

export interface RequestCardBody{
  email: string;
  firstname: string;
  lastname: string;
}
export interface FriendCard{
  email: string;
  phone: number;
  firstname: string;
  lastname: string;
  address: string;
  birthday: string;
}
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public contactsController: FormGroup;
  public peopleList: RequestCardBody [] = [];
  public friendsList: FriendCard [] = [];
  public selectedProfile: FriendCard = undefined;

  constructor(private fb: FormBuilder, private http: HttpClient, private dataManagerService: DataManagerService) {
    this.fetchFriendsList();
  }

  ngOnInit(): void {
    this.contactsController = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  public onClickCloseProfile(): void{
    this.selectedProfile = undefined;
  }
  public onClickOpenProfile(index: number): void{
    this.selectedProfile = this.friendsList[index];
  }
  public onClickSendFriendRequest(index: number): void{
    const personal = this.dataManagerService.$profile.getValue().email;
    const friend = this.peopleList[index].email;
    this.http.put(url + '/contacts?sendRequest=true', {personalEmail: personal, email: friend})
      .subscribe((data) => {
    });
  }
  public onTypingSearch(): void{
    const personalEmail = this.dataManagerService.$profile.getValue().email;
    if (this.inputValue){
      this.http.post(url + '/contacts', this.inputValue)
        .subscribe((card: any) => {
          this.peopleList = [];
          card.requestCardList.map((person) => {
            const alreadyFriend = this.friendsList.some((friend) => {
              if (person.email === friend.email){
                return true;
              }
            });
            if (!alreadyFriend){
              if (person.email !== personalEmail){
                this.peopleList.push(person);
              }
            }
          });
        });
    }
    else{
      this.peopleList = [];
    }
  }
   get inputValue(): string{
    return this.contactsController.controls.email.value;
  }

  public fetchFriendsList(): void{
    this.http.get(url + '/contacts/friends-list?email=' + this.dataManagerService.$profile.getValue().email)
      .subscribe((list: any) => {
        this.friendsList = [];
        this.friendsList = list.friendsList;
    });
  }
}
