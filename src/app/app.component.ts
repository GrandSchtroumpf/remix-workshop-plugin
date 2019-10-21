import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main>
      <router-outlet></router-outlet>
      <app-toaster></app-toaster>
    </main>
  `,
  styles: [':host, main {height: 100%; display: block;}']
})
export class AppComponent {
  constructor() {}
}
