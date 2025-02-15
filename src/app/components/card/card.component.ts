/* import { Component, Input } from '@angular/core';
import { Card } from '../../models';
import { BoardService } from '../../board.service';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card!: Card;
  @Input() boardId!: string; // Ajouter une propriété pour l'ID du tableau
  isEditing: boolean = false;
  constructor(private boardService: BoardService) {}

  markAsComplete() {
    this.boardService.markCardAsComplete(this.boardId, this.card.id); // Marquer la carte comme complète
    console.log(`Tâche "${this.card.title}" marquée comme complète.`);
  }

  editTask() {
    this.isEditing = true;
  }

  onCardSave(updatedCard: Card) {
    // Logique pour mettre à jour la carte avec les nouvelles données
    this.card.title = updatedCard.title;
    this.card.description = updatedCard.description;
    this.card.labels = updatedCard.labels;
    this.card.dueDate = updatedCard.dueDate;
    this.card.priority = updatedCard.priority;
    this.card.assignedTo = updatedCard.assignedTo;
    this.isEditing = false; // Fermer le formulaire
  }

  onCardCancel() {
    this.isEditing = false;
  }
}
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../../models';
import { BoardService } from '../../board.service';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card!: Card;
  @Input() boardId!: string; // Ajouter une propriété pour l'ID du tableau
  @Output() editCard = new EventEmitter<Card>(); // Émettre un événement pour l'édition

  constructor(private boardService: BoardService) {}

  markAsComplete() {
    this.boardService.markCardAsComplete(this.boardId, this.card.id); // Marquer la carte comme complète
    console.log(`Tâche "${this.card.title}" marquée comme complète.`);
  }

  onEditTask() {

  /*   console.log('Édition de la carte:', this.card); */
    this.editCard.emit(this.card); // Émettre l'événement avec la carte à éditer
  }



  getFlagColor(): string {
    switch (this.card.priority) {
      case 'high':
        return 'text-red-500'; // Rouge pour haute priorité
      case 'medium':
        return 'text-yellow-500'; // Jaune pour priorité moyenne
      case 'low':
        return 'text-green-500'; // Vert pour basse priorité
      default:
        return 'text-gray-500'; // Couleur par défaut
    }
  }

  formatDueDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }
}
