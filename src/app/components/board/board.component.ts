import { Component, OnInit } from '@angular/core';
import { Board } from '../../models';
import { BoardService } from '../../board.service';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-board',
  standalone: false,
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board!: Board;

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.board = this.boardService.getBoard();
  }

  addList() {
    // Logique pour ajouter une nouvelle liste
    console.log('Ajouter une nouvelle liste');
  }


  toggleFavorite() {
    // Logique pour ajouter ou retirer des favoris
    console.log('Toggle Favorite');
  }

  toggleVisibility() {
    // Logique pour changer la visibilité
    console.log('Toggle Visibility');
  }

  filter() {
    // Logique pour filtrer les cartes
    console.log('Filter Cards');
  }

  openProfile() {
    // Logique pour ouvrir le profil
    console.log('Open Profile');
  }

  share() {
    // Logique pour partager le tableau
    console.log('Share Board');
  }
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.board.lists, event.previousIndex, event.currentIndex);
  }
}
