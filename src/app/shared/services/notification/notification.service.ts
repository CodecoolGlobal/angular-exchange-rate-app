import { Injectable } from '@angular/core';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notificationService: NotificationsService) {
  }

  showSuccessNotification(message): void {
    this.notificationService.success('SUCCESS', message, {
      position: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  showWarningNotification(message): void {
    this.notificationService.warn('WARNING', message, {
      position: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  showErrorNotifications(message): void {
    this.notificationService.error('ERROR', message, {
      position: ['bottom', 'left'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }
}
