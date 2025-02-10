import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { List } from '../../models';

@Component({
  selector: 'app-list-form',
  standalone: false,
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.css']
})
export class ListFormComponent {
  @Input() list?: List; // For editing
  @Output() save = new EventEmitter<List>();
  @Output() cancel = new EventEmitter<void>();

  listForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.listForm = this.fb.group({
      title: [''],
      color: [''], // New field for color
      tags: [''], // New field for tags
    });
  }

  ngOnChanges() {
    if (this.list) {
      this.listForm.patchValue({
        title: this.list.title,
        color: this.list.color || '#ffffff', // Default color if not provided
        tags: this.list.tags ? this.list.tags.join(', ') : '', // Join tags for display
      });
    }
  }

  onSubmit() {
    if (this.listForm.valid) {
      const formValue = this.listForm.value;
      // Split tags into an array
      formValue.tags = formValue.tags.split(',').map((tag: string) => tag.trim());
      const updatedList: List = {
        id: this.list?.id || this.generateId(), // Use existing ID or generate a new one
        title: formValue.title,
        color: formValue.color,
        tags: formValue.tags,
        cards: this.list?.cards || [] // Keep existing cards
      };
      this.save.emit(updatedList); // Emit the updated list
      this.listForm.reset();
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9); // Simple ID generation
  }
}
