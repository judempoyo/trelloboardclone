import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Card } from '../../models';

@Component({
  selector: 'app-card-form',
  standalone: false,
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
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
      labels: [''],
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
        labels: this.card.labels ? this.card.labels.join(', ') : '',
        dueDate: this.card.dueDate ? this.card.dueDate.toISOString().split('T')[0] : '',
        priority: this.card.priority,
        assignedTo: this.card.assignedTo ? this.card.assignedTo.join(', ') : '',
      });
    }
  }

  onSubmit() {
    if (this.cardForm.valid) {
      const formValue = this.cardForm.value;
      const card: Card = {
        id: this.card ? this.card.id : this.generateId(),
        title: formValue.title,
        description: formValue.description,
        labels: formValue.labels ? formValue.labels.split(',').map((label: string) => label.trim()) : [],
        dueDate: formValue.dueDate ? new Date(formValue.dueDate) : undefined,
        priority: formValue.priority,
        assignedTo: formValue.assignedTo ? formValue.assignedTo.split(',').map((user: string) => user.trim()) : [],
        color: this.card?.color,
      };
      this.save.emit(card);
      this.cardForm.reset();
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
