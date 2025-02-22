// list-form.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { List } from '../../models';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-list-form',
  standalone: false,
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.css']
})
export class ListFormComponent {
  @Input() list?: List;
  @Output() save = new EventEmitter<List>();
  @Output() cancel = new EventEmitter<void>();
  separatorKeysCodes: number[] = [13, 188]; // Enter et comma
  listForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.listForm = this.fb.group({
      title: [''],
      color: ['#ffffff'],
      tags: [[]] // Initialiser comme tableau vide
    });
  }

  ngOnChanges() {
    if (this.list) {
      this.listForm.patchValue({
        title: this.list.title,
        color: this.list.color || '#ffffff',
        tags: this.list.tags || [] // Conserver le format tableau
      });
    }
  }

  // Ajouter un tag
  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.listForm.get('tags')?.setValue([
        ...this.listForm.get('tags')?.value,
        value
      ]);
    }
    event.chipInput!.clear();
  }

  // Supprimer un tag
  removeTag(tag: string): void {
    const tags = this.listForm.get('tags')?.value;
    const index = tags.indexOf(tag);
    if (index >= 0) {
      tags.splice(index, 1);
      this.listForm.get('tags')?.setValue([...tags]);
    }
  }

  onSubmit() {
    if (this.listForm.valid) {
      const formValue = this.listForm.value;
      const updatedList: List = {
        id: this.list?.id || this.generateId(),
        title: formValue.title,
        color: formValue.color,
        tags: formValue.tags, // Déjà au format tableau
        cards: this.list?.cards || []
      };
      this.save.emit(updatedList);
      this.listForm.reset({
        color: '#ffffff',
        tags: []
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