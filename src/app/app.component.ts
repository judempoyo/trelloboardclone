import { Component, OnInit, HostBinding, effect, signal } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent  {
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


}
