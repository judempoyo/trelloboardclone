
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
  @Input() boardId!: string;  
  @Output() editCard = new EventEmitter<Card>();  

  constructor(private boardService: BoardService) {}

  markAsComplete() {
    this.boardService.markCardAsComplete(this.boardId, this.card.id);  
    console.log(`Tâche "${this.card.title}" marquée comme complète.`);
  }

  onEditTask() {

  /*   console.log('Édition de la carte:', this.card); */
    this.editCard.emit(this.card);  
  }



  getFlagColor(): string {
    switch (this.card.priority) {
      case 'high':
        return 'text-red-500';  
      case 'medium':
        return 'text-yellow-500';  
      case 'low':
        return 'text-green-500';  
      default:
        return 'text-gray-500'; 
    }
  }

  formatDueDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }
}
