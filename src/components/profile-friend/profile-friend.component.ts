import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-profile-friend',
  templateUrl: './profile-friend.component.html',
  styleUrls: ['./profile-friend.component.scss']
})
export class ProfileFriendComponent implements OnInit {
  public isCollapse = true;
  public showCard = false;
  @Input() public selectedProfile;
  @Input() public index;
  @Output() public  isClosed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {

  }
  public onClickCloseProfile(): void{
    this.isClosed.emit(true);
  }
  public onClickCollapseProfile(): void{
    this.isCollapse = !this.isCollapse;
    if (!this.isCollapse){
      this.showCard = false;
    }
  }
  public onClickShowCard(): void{
    this.showCard = !this.showCard;
  }
}
