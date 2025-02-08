import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Card } from '../../models';

@Component({
  selector: 'app-card-form-component',
  standalone: false,

  templateUrl: './card-form-component.component.html',
  styleUrl: './card-form-component.component.css'
})

export class CardFormComponent {
  @Input() card?: Card; // Pour l'édition
  @Output() save = new EventEmitter<Card>();
  @Output() cancel = new EventEmitter<void>();

  cardForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.cardForm = this.fb.group({
      title: [''],
      description: [''],
      // Ajoutez d'autres champs si nécessaire
    });
  }

  ngOnChanges() {
    if (this.card) {
      this.cardForm.patchValue(this.card);
    }
  }

  onSubmit() {
    if (this.cardForm.valid) {
      this.save.emit(this.cardForm.value);
      this.cardForm.reset();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
