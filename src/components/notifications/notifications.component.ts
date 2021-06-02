import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {url} from '../../modules/sign-up/sign-up.component';
import {DataManagerService} from '../../services/data-manager.service';
import {interval} from 'rxjs';

export interface FriendRequest {
  firstname: string;
  lastname: string;
  email: string;
  newNotification: boolean;
}

export interface Notification{
  label: string;
  newRequest: boolean;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  public isNotifications = false;
  public notificationsList: Notification [] = [];
  public notificationsBackend: FriendRequest[] = [];
  public isOpen = false;
  public notificationIconName = 'notifications';
  public subscriptionNotification;
  @HostListener('window:click', ['$event'])
  public onClickClose($event): void{
    if ($event.target.className !== 'notification'
      && $event.target.id !== 'notification_icon'
      && $event.target.id !== 'notification_accept'
      && $event.target.id !== 'notification_reject'
      && $event.target.className !== 'notifications-body'
    ){
      this.isOpen = false;
    }
  }
  constructor(private http: HttpClient, private dataManagerService: DataManagerService) {
    this.fetchNotifications();
  }

  public ngOnInit(): void {
    this.subscriptionNotification = interval(25000).subscribe(() => this.fetchNotifications());
  }
  public ngOnDestroy(): void {
    this.subscriptionNotification.unsubscribe();
  }
  public fetchNotifications(): void{
    this.notificationsList = [];
    this.notificationsBackend = [];
    this.http.post<any>(url + '/profile?notifications', this.dataManagerService.$profile.getValue().email).subscribe((notifications) => {
      notifications.notifications.map(notification => {
        this.notificationsBackend.push(notification);
        this.notificationsList.push({label: notification.firstname + ' sent you a friend request',
          newRequest: notification.newNotification});
      });
      this.checkForNewNotifications();
    });
  }
  public onClickNotification(index: number): void{
    this.notificationsList[index].newRequest = false;
    const personalEmail = this.dataManagerService.$profile.getValue().email;
    this.http.put(url + '/profile?notification_seen=' + personalEmail, this.notificationsBackend[index])
      .subscribe();
    this.fetchNotifications();
    this.checkForNewNotifications();
  }
  public onClickToggle(): void{
    this.isOpen = !this.isOpen;
  }
  public acceptRequest(index: number): void{
    this.http.post(url + '/profile?acceptRequest',
      {personalEmail: this.notificationsBackend[index].email,
        email: this.dataManagerService.$profile.getValue().email}).subscribe(() => this.fetchNotifications());
  }
  public checkForNewNotifications(): void{
    if(this.notificationsList.length){
      this.notificationsList.some((notification) => {
        if (notification.newRequest){
          this.notificationIconName = 'notifications_active';
          this.isNotifications = true;
        }
        else{
          this.notificationIconName = 'notifications';
          this.isNotifications = false;
        }
        return notification.newRequest;
      });
    }
    else{
      this.notificationIconName = 'notifications';
      this.isNotifications = false;
    }
  }
  public rejectRequest(): void{}
}
