import {Component, Input, OnInit, Output, EventEmitter, ElementRef, HostListener, ViewChild} from '@angular/core';

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
  @ViewChild('profileHeader') public profileHeader: ElementRef;
  @HostListener('window:click', ['$event'])
  public onClickToggle(event): void {
    if (this.profileHeader.nativeElement.contains(event.target)) {
      this.showCard = true;
    } else {
      this.showCard = false;
    }
  }

  constructor(private eRef: ElementRef) { }

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
}
