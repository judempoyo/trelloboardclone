import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Board } from '../../models';

@Component({
  selector: 'app-board-form',
  standalone: false,

  templateUrl: './board-form.component.html',
  styleUrl: './board-form.component.css'
})
export class BoardFormComponent {
  @Input() board?: Board; // Pour l'édition
  @Output() save = new EventEmitter<Board>();
  @Output() cancel = new EventEmitter<void>();

 boardForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.boardForm = this.fb.group({
      title: [''],
      // Ajoutez d'autres champs si nécessaire
    });
  }

  ngOnChanges() {
    if (this.board) {
      this.boardForm.patchValue(this.board);
    }
  }

  onSubmit() {
    if (this.boardForm.valid) {
      this.save.emit(this.boardForm.value);
      this.boardForm.reset();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
