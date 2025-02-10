import { Component, OnInit } from '@angular/core';
import { Board } from '../../models';
import { BoardService } from '../../board.service';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { List } from '../../models'; // Import List model
import { ListFormComponent } from '../list-form/list-form.component';


@Component({
  selector: 'app-board',
  standalone: false,
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board!: Board;
  isAddingList: boolean = false;

  svgFavorite: string = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>';
  svgVisibility: string = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5C6.75 4.5 2.25 9 2.25 12s4.5 7.5 9.75 7.5 9.75-4.5 9.75-7.5S17.25 4.5 12 4.5zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" /></svg>';
  svgFilter: string = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h18M3 12h18M3 20h18" /></svg>';
  svgProfile: string = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-10 1.67-10 5v1h20v-1c0-3.33-6.69-5-10-5z" /></svg>';
  svgShare: string = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12h-6m6 0l-3-3m3 3l-3 3" /></svg>';

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.board = this.boardService.getBoard();
  }


  addList() {
    console.log('Ajouter une nouvelle liste');
    this.isAddingList = true; // Show the list form
  }

  onListSave(newList: List) {
    this.board.lists.push(newList); // Add the new list to the board
    this.isAddingList = false; // Hide the list form
  }

  onListCancel() {
    this.isAddingList = false; // Hide the list form
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
