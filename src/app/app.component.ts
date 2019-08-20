import { Component, Inject } from '@angular/core';
import { REMIX } from './remix-client';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [':host {height: 100%; display: block;}']
})
export class AppComponent {
  // Inject remix at startup time to get the load event
  constructor(@Inject(REMIX) remix) {}

}
