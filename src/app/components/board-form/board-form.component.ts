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
  @Input() title: string = '';


 boardForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.boardForm = this.fb.group({
      title: [''],
      backgroundColor:['']
    });
  }

  ngOnChanges() {
    if (this.board) {
      this.boardForm.patchValue({
        title: this.board.title,
        backgroundColor: this.board.backgroundColor || '#ffffff',
      });
    }
  }

  onSubmit() {
    if (this.boardForm.valid) {
      const formValue = this.boardForm.value;
      const updatedBoard:Board = {
        id:this.board?.id || this.generateId(),
        title:formValue.title,
        backgroundColor:formValue.backgroundColor,
        lists:[]
      }
      this.save.emit(updatedBoard);
      this.boardForm.reset();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9); // Simple ID generation
  }

}
