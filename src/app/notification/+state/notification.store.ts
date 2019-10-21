import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, guid } from '@datorama/akita';
import { Notification, createNotification } from './notification.model';

export interface NotificationState extends EntityState<Notification> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'notification' })
export class NotificationStore extends EntityStore<NotificationState> {

  private actions: Record<string, () => void> = {};

  constructor() {
    super();
  }

  show(notification: Partial<Notification> = {}, action?: () => void) {
    const notif = createNotification(notification);
    if (action) {
      notif.action = notif.action || 'ok';
      this.actions[notif.id] = action;
    }
    this.add(notif);
    setTimeout(() => this.delete(notif.id), notif.delay);
  }

  runAction(id: string) {
    this.actions[id]();
    this.delete(id);
  }

  delete(id: string) {
    this.remove(id);
    delete this.actions[id];
  }
}

