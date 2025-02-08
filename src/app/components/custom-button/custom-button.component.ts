import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-custom-button',
  standalone: false,

  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.css'
})

export class CustomButtonComponent {
  @Input() action: () => void = () => {};
  private _svg: string = '';
  public sanitizedSvg!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  @Input()
  set svg(value: string) {
    this._svg = value;
    this.sanitizedSvg = this.sanitizer.bypassSecurityTrustHtml(value);
  }

  get svg(): string {
    return this._svg;
  }
}
