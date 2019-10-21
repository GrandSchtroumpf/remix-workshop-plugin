import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NotificationQuery, Notification, NotificationStore } from '../+state';
import { Observable } from 'rxjs';
import { slideInY, slideOutY } from 'src/app/ui/animations';
import { trigger, transition } from '@angular/animations';

const slide = trigger('slide', [
  transition(':enter', slideInY),
  transition(':leave', slideOutY),
]);

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  animations: [slide],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToasterComponent implements OnInit {

  public toasts$: Observable<Notification[]>;

  constructor(
    private store: NotificationStore,
    private query: NotificationQuery
  ) { }

  ngOnInit() {
    this.toasts$ = this.query.selectAll();
  }

  remove(id: string) {
    this.store.remove(id);
  }

  action(id: string) {
    this.store.runAction(id);
  }
}
