import {AfterViewInit, Component, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {url} from '../../modules/sign-up/sign-up.component';
import {DataManagerService} from '../../services/data-manager.service';
import {interval} from 'rxjs';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements AfterViewInit, OnDestroy {
  public chatHistory = [];
  public subscriptionChat;
  public activeScrollToBottom = true;
  @Input() public selectedProfile;
  @ViewChild('container') public container;
  constructor(private http: HttpClient, private dataManagerService: DataManagerService) { }

  ngAfterViewInit(): void {
    this.fetchChat();
    if (this.container){
      setTimeout(() => this.scrollToBottom(), 200);
    }
    this.subscriptionChat = interval(1000).subscribe(() => this.fetchChat());
  }
  public ngOnDestroy(): void {
    this.subscriptionChat.unsubscribe();
  }

  public fetchChat(): void{
    this.http.get(url + '/contacts/chat/' + this.dataManagerService.$profile.getValue().email + '/' + this.selectedProfile.email)
      .subscribe((chat: any) => {
        this.chatHistory = chat.chat;
        setTimeout(() => this.scrollToBottom(), 0);
        }
      );
  }
  public sendMsg(msgText): void{
    this.chatHistory.push({text: msgText.target.value, iSent: true});
    const sent = this.dataManagerService.$profile.getValue().email;
    const msg = {text: msgText.target.value, sentEmail: sent, receivedEmail: this.selectedProfile.email };
    this.http.put(url + '/contacts?chat', msg).subscribe();
    setTimeout(() => {
      this.fetchChat();
      this.activeScrollToBottom = true;
    }, 0);
    msgText.target.value = '';
  }
  public onScroll($event): void{
    this.activeScrollToBottom = $event.target.scrollTop + $event.target.offsetHeight === $event.target.scrollHeight;
  }
  public scrollToBottom(): void{
    if (this.activeScrollToBottom){
      this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
    }
  }
}
