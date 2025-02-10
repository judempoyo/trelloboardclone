import { Injectable } from '@angular/core';
import { Board, List } from './models';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private board: Board = {
    id: '1',
    title: 'Mon tableau Trello',
    lists: [
      {
        id: '1',
        title: 'À faire',
        cards: [
          { id: '1', title: 'Tâche 1', description: 'Description de la tâche 1' },
          { id: '2', title: 'Tâche 2', description: 'Description de la tâche 2' }
        ]
      },
      {
        id: '2',
        title: 'En cours',
        cards: [
          { id: '3', title: 'Tâche 3', description: 'Description de la tâche 3' }
        ]
      }
    ]
  };

  getBoard(): Board {
    return this.board;
  }

  addList(newList: List): void {
    this.board.lists.push(newList);
  }

  deleteList(listId: string): void {
    this.board.lists = this.board.lists.filter(list => list.id !== listId);
  }

  copyList(originalList: List): List {
    const copiedList: List = {
      ...originalList,
      id: this.generateId(), // Generate a new ID for the copied list
      title: `${originalList.title} (Copy)`, // Optionally modify the title
      cards: [...originalList.cards] // Copy the cards as well
    };
    this.addList(copiedList); // Add the copied list to the board
    return copiedList; // Return the copied list
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9); // Simple ID generation
  }
}
