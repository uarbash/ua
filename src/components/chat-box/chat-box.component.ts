import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
  @Input() public receivedEmail: string;
  @ViewChild('container') public container;
  public subscriptionChat;
  constructor(private http: HttpClient, private dataManagerService: DataManagerService) { }

  ngAfterViewInit(): void {
    this.fetchChat();
    if (this.container){
      setTimeout(() => this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight, 200)
    }
    this.subscriptionChat = interval(5000).subscribe(() => this.fetchChat());
  }
  public ngOnDestroy(): void {
    this.subscriptionChat.unsubscribe();
  }

  public fetchChat(): void{
    console.log(this.dataManagerService.$profile.getValue().email, this.receivedEmail)
    this.http.get(url + '/contacts/chat/' + this.dataManagerService.$profile.getValue().email + '/' + this.receivedEmail)
      .subscribe((chat: any) => {
        this.chatHistory = chat.chat;
        setTimeout(() => this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight, 0)
        }
      );
  }
  public sendMsg(msgText): void{
    this.chatHistory.push({text: msgText.target.value, iSent: true});
    const sent = this.dataManagerService.$profile.getValue().email;
    const msg = {text: msgText.target.value, sentEmail: sent, receivedEmail: this.receivedEmail };
    this.http.put(url + '/contacts?chat', msg).subscribe((data) => console.log(data));
    setTimeout(() => {
      this.fetchChat();
      this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
    }, 0);
    msgText.target.value = '';
  }
}
