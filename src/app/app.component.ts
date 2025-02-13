import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, HostBinding, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  animations: [
    trigger('routeAnimations', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('1000ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent   {
  title = 'trelloboardclone';


  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'true')
  );

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }
  constructor() {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });

  }

  getRouteAnimation(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute.snapshot.url.join('') : '';
  }


}
