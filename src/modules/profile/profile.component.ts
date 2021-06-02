import { Component, OnInit } from '@angular/core';
import {DataManagerService} from '../../services/data-manager.service';
import {Profile} from '../sign-up/sign-up.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public profile: Profile;
  constructor(private dataManagerPrivate: DataManagerService) {
    this.dataManagerPrivate.$profile.subscribe((prof) => {
      this.profile = prof;
    });
  }
}
