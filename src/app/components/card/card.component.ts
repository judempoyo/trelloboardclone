import { Component, Input } from '@angular/core';
import { Card } from '../../models';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card!: Card;

  markAsRead() {
    // Logique pour marquer la tâche comme lue
    console.log(`Tâche "${this.card.title}" marquée comme lue.`);
    // Vous pouvez également mettre à jour un état ou une propriété ici
  }

  editTask() {
    // Logique pour modifier la tâche
    console.log(`Modifier la tâche "${this.card.title}".`);
    // Vous pouvez ouvrir un modal ou une autre interface pour modifier la tâche
  }
}
