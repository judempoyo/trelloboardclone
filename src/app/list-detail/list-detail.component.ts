import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from '../models';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-list-detail',
  standalone: false,
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css' // Correction de "styleUrl" en "styleUrls"
  ]
})
export class ListDetailComponent implements OnInit {
  list!: List | undefined;
  boardId!: string; // Ajouter une propriété pour stocker l'ID du tableau

  constructor(private route: ActivatedRoute, private boardService: BoardService) {}

  ngOnInit(): void {
    // Récupérer l'ID du tableau et de la liste à partir des paramètres de la route
    this.boardId = this.route.snapshot.paramMap.get('boardId')!;
    const listId = this.route.snapshot.paramMap.get('id');

    if (this.boardId && listId) {
      // Obtenir le tableau correspondant à l'ID
      const board = this.boardService.getBoard(this.boardId);
      if (board) {
        // Rechercher la liste dans le tableau
        this.list = board.lists.find(l => l.id === listId);
      }
    }
  }
}
