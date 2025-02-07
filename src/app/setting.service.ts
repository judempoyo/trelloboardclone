import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeKey = 'theme';

  constructor() {
    this.loadTheme();
  }

  toggleTheme() {
    console.log('toggle theme')
    const currentTheme = localStorage.getItem(this.themeKey);
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(this.themeKey, newTheme);
    this.applyTheme(newTheme);
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem(this.themeKey) || 'light';
    this.applyTheme(savedTheme);
  }

  private applyTheme(theme: string) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
}
