import { Component, OnInit } from '@angular/core';
import {DataManagerService} from '../../services/data-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dataManagerService: DataManagerService) { }

  ngOnInit(): void {
  }

  public onClickSignOut(): void{
    this.dataManagerService.$isSignedIn.next(false);
  }

  get isSignedIn(): boolean{
    return this.dataManagerService.$isSignedIn.getValue();
  }
}
