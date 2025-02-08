import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { List } from '../../models';

@Component({
  selector: 'app-list-form-component',
  standalone: false,

  templateUrl: './list-form-component.component.html',
  styleUrl: './list-form-component.component.css'
})

export class ListFormComponent {
  @Input() list?: List; // Pour l'édition
  @Output() save = new EventEmitter<List>();
  @Output() cancel = new EventEmitter<void>();

  listForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.listForm = this.fb.group({
      title: [''],
      // Ajoutez d'autres champs si nécessaire
    });
  }

  ngOnChanges() {
    if (this.list) {
      this.listForm.patchValue(this.list);
    }
  }

  onSubmit() {
    if (this.listForm.valid) {
      this.save.emit(this.listForm.value);
      this.listForm.reset();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
