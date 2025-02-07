// src/app/board.service.ts

import { Injectable } from '@angular/core';
import { Board } from './models';

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
}
