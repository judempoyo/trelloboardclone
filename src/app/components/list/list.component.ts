
import { Component, Input } from '@angular/core';
import { List } from '../../models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() list!: List;

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.list.cards, event.previousIndex, event.currentIndex);
    } else { 
      console.warn('Déplacement entre les listes non géré ici.');
    }
  }
}
