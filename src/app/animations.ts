import { style, animate } from '@angular/animations';

export const slideInY = [
  style({
    transform: 'translateY(100px) scaleY(1.2)',
    opacity: 0
  }),
  animate('400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)')
];
