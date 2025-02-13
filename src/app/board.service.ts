import { Injectable } from '@angular/core';
import { Board, List, Card } from './models';

@Injectable({ providedIn: 'root' })
export class BoardService {
  private boards: Board[] = []; // Stocker plusieurs tableaux

  constructor() {
    // Initialiser avec deux tableaux par défaut
    this.boards.push(this.createDefaultBoard('1', 'Mon tableau Trello'));
    this.boards.push(this.createDefaultBoard('2', 'Mon deuxième tableau'));
  }

  private createDefaultBoard(id: string, title: string): Board {
    return {
      id: id,
      title: title,
      lists: [
        {
          id: '1',
          title: 'À faire',
          color: 'teal',
          tags: ['urgent', 'important'],
          cards: [
            {
              id: '1',
              title: 'Tâche 1',
              description: 'Description de la tâche 1',
              labels: ['label1', 'label2'],
              dueDate: new Date('2023-12-31'),
              comments: [],
              priority: 'high',
              assignedTo: ['user1'],
              color: 'red',
              isCompleted: false
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
              isCompleted: false
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
              isCompleted: false
            }
          ]
        }
      ],
      backgroundColor: 'white',
      members: ['user1', 'user2'],
      favorites: []
    };
  }

  getBoards(): Board[] {
    return this.boards; // Retourner tous les tableaux
  }

  getBoard(boardId: string): Board | undefined {
    return this.boards.find(board => board.id === boardId); // Retourner un tableau par son ID
  }

  addBoard(newBoard: Board): void {
    this.boards.push(newBoard); // Ajouter un nouveau tableau
  }

  deleteBoard(boardId: string): void {
    this.boards = this.boards.filter(board => board.id !== boardId); // Supprimer un tableau par son ID
  }
  setBoardToFavorite(boardId: string) {
    const board = this.getBoard(boardId);
    if (board) {

      const favorite = board.favorites?.find(f => f === 'userid');
      if (!favorite) {
        console.log('ajout');
        board.favorites?.push('userid');
      } else {
        console.log('suppression');
        //board.favorites?;
      }
    }
  }

  markListAsComplete(boardId: string, listId: string): void {
    const board = this.getBoard(boardId);
    if (board) {
      const list = board.lists.find(l => l.id === listId);
      if (list) {
        list.isCompleted = true; // Marquer la liste comme complète
      }
    }
  }


  addList(boardId: string, newList: List): void {
    const board = this.getBoard(boardId);
    if (board) {
      board.lists.push(newList); // Ajouter une nouvelle liste au tableau
    }
  }

    deleteList(boardId: string, listId: string): void {
      const board = this.getBoard(boardId);
      if (board) {
        board.lists = board.lists.filter(list => list.id !== listId); 
      }
    }

  copyList(boardId: string, originalList: List): List | undefined {
    const board = this.getBoard(boardId);
    if (board) {
      const copiedList: List = {
        ...originalList,
        id: this.generateId(),
        title: `${originalList.title} (Copy)`,
        cards: [...originalList.cards]
      };
      this.addList(boardId, copiedList); // Ajouter la liste copiée au tableau
      return copiedList; // Retourner la liste copiée
    }
    return undefined;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9); // Génération d'un ID simple
  }

  markCardAsComplete(boardId: string, cardId: string): void {
    const board = this.getBoard(boardId);
    if (board) {
      for (const list of board.lists) {
 const card = list.cards.find(c => c.id === cardId);
        if (card) {
          card.isCompleted = !card.isCompleted; // Inverser l'état de complétion de la carte
          break;
        }
      }
    }
  }

  getCardById(boardId: string, cardId: string): Card | undefined {
    const board = this.getBoard(boardId);
    if (board) {
      for (const list of board.lists) {
        const card = list.cards.find(c => c.id === cardId);
        if (card) {
          return card; // Retourner la carte par son ID
        }
      }
    }
    return undefined; // Retourner undefined si la carte n'est pas trouvée
  }
}
