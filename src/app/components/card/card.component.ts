import { Component, Input } from '@angular/core';
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
  isEditing: boolean = false;
  constructor(private boardService: BoardService) {}

  markAsComplete() {

    this.boardService.markCardAsComplete(this.card.id);
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
  }}
