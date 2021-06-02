import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toggle-box',
  templateUrl: './toggle-box.component.html',
  styleUrls: ['./toggle-box.component.scss']
})
export class ToggleBoxComponent implements OnInit {
  @Input() public header: string;
  @Input() public isOpen = true;
  @Input() public customHeader = false;
  constructor() { }

  ngOnInit(): void {
  }

  public onClickHeader(): void{
    this.isOpen = !this.isOpen;
  }

}
