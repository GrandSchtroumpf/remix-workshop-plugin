import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { NotificationStore, NotificationState } from './notification.store';

@Injectable({ providedIn: 'root' })
export class NotificationQuery extends QueryEntity<NotificationState> {

  constructor(protected store: NotificationStore) {
    super(store);
  }

}
