import { trigger, transition, style, animate } from '@angular/animations';

export const slideInAnimation = trigger('slideInAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-50px)' }), // Empieza desde arriba y ligeramente transparente
    animate('0.5s cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' })), // Suaviza el movimiento
  ]),
]);
