import { style, animate } from '@angular/animations';

export const slideInY = [
  style({
    transform: 'translateY(50px) scaleY(1.1)',
    opacity: 0
  }),
  animate('400ms cubic-bezier(0.68, -0.55, 0.265, 1.55)')
];
