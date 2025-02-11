import { Injectable } from '@angular/core';
import { Board, List, Card } from './models';

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
        color: 'lightblue', // Exemple de couleur
        tags: ['urgent', 'important'], // Exemple de tags
        cards: [
          {
            id: '1',
            title: 'Tâche 1',
            description: 'Description de la tâche 1',
            labels: ['label1', 'label2'], // Exemple de labels
            dueDate: new Date('2023-12-31'), // Exemple de date d'échéance
            comments: [], // Initialiser les commentaires
            priority: 'high', // Exemple de priorité
            assignedTo: ['user1'], // Exemple d'utilisateur assigné
            color: 'red', // Exemple de couleur de carte,
            isCompleted:false
          },
          {
            id: '2',
            title: 'Tâche 2',
            description: 'Description de la tâche 2',
            labels: ['label3'],
            dueDate: new Date('2023-11-30'),
            comments: [],
            priority: 'medium',
            assignedTo: [],
            color: 'green',
            isCompleted:false
          }
        ]
      },
      {
        id: '2',
        title: 'En cours',
        color: 'lightgreen',
        tags: [],
        cards: [
          {
            id: '3',
            title: 'Tâche 3',
            description: 'Description de la tâche 3',
            labels: [],
            dueDate: new Date('2023-12-31'),
            comments: [],
            priority: 'low',
            assignedTo: ['user2'],
            color: 'yellow',
            isCompleted:false
          }
        ]
      }
    ],
    backgroundColor: 'white', // Exemple de couleur de fond du tableau
    members: ['user1', 'user2'], // Exemple de membres du tableau
    favorites: [] // Exemple de favoris
  };

  getBoard(): Board {
    return this.board;
  }

  markListAsComplete(listId: string): void {
    const list = this.board.lists.find(l => l.id === listId);
    if (list) {
      list.isCompleted = true; // Marquer la liste comme complète
    }
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

  markCardAsComplete(cardId: string): void {
    for (const list of this.board.lists) {
      const card = list.cards.find(c => c.id === cardId);
      if (card) {
        card.isCompleted = !card.isCompleted;
        break;
      }
    }
  }

  // Méthode pour obtenir une carte par son ID (facultatif)
  getCardById(cardId: string): Card | undefined {
    for (const list of this.board.lists) {
      const card = list.cards.find(c => c.id === cardId);
      if (card) {
        return card;
      }
    }
    return undefined;
  }
}
