import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Card } from '../../models';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-card-form',
  standalone:false,
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent {
  @Input() card?: Card;
  @Output() save = new EventEmitter<Card>();
  @Output() cancel = new EventEmitter<void>();
  separatorKeysCodes: number[] = [13, 188]; // Enter et comma
  cardForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialisation du formulaire dans le constructeur
    this.cardForm = this.fb.group({
      title: [''],
      description: [''],
      labels: [[]], // Initialiser comme tableau vide
      dueDate: [''],
      priority: [''],
      assignedTo: [''],
    });
  }

  createForm() {
    this.cardForm = this.fb.group({
      title: [''],
      description: [''],
      labels: [[]], // Initialiser comme tableau vide
      dueDate: [''],
      priority: [''],
      assignedTo: [''],
    });
  }

  ngOnChanges() {
    if (this.card) {
      this.cardForm.patchValue({
        title: this.card.title,
        description: this.card.description,
        labels: this.card.labels || [], // Conserver le format tableau
        dueDate: this.card.dueDate ? this.card.dueDate.toISOString().split('T')[0] : '',
        priority: this.card.priority,
        assignedTo: this.card.assignedTo ? this.card.assignedTo.join(', ') : '',
      });
    }
  }

  // Ajouter un label
  addLabel(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.cardForm.get('labels')?.setValue([
        ...this.cardForm.get('labels')?.value,
        value
      ]);
    }
    event.chipInput!.clear();
  }

  // Supprimer un label
  removeLabel(label: string): void {
    const labels = this.cardForm.get('labels')?.value;
    const index = labels.indexOf(label);
    if (index >= 0) {
      labels.splice(index, 1);
      this.cardForm.get('labels')?.setValue([...labels]);
    }
  }

  onSubmit() {
    if (this.cardForm.valid) {
      const formValue = this.cardForm.value;
      const card: Card = {
        id: this.card ? this.card.id : this.generateId(),
        title: formValue.title,
        description: formValue.description,
        labels: formValue.labels, // Déjà au format tableau
        dueDate: formValue.dueDate ? new Date(formValue.dueDate) : undefined,
        priority: formValue.priority,
        assignedTo: formValue.assignedTo ? formValue.assignedTo.split(',').map((user: string) => user.trim()) : [],
        color: this.card?.color,
      };
      this.save.emit(card);
      this.cardForm.reset({
        labels: [] // Réinitialiser les labels
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}