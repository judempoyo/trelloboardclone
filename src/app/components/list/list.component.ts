import { Component, Input } from '@angular/core';
import { Card, List } from '../../models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BoardService } from '../../board.service'; // Import the BoardService

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  dropdownOpen: boolean = false;
  @Input() list!: List;
  isAddingCard: boolean = false;
  isEditingList: boolean = false; // State to show/hide the edit list form
  editedList: List; // Store the edited list data

  constructor(private boardService: BoardService) {
    this.editedList = { id: '', title: '', cards: [] }; // Initialize with default values
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  copyList() {
    const copiedList = this.boardService.copyList(this.list); // Use the service to copy the list
    console.log('Liste copiée:', copiedList);
    this.dropdownOpen = false;
  }

  addCard() {
    console.log('Ajouter une nouvelle tâche');
    this.isAddingCard = true;
    this.dropdownOpen = false;
  }

  onCardSave(newCard: Card) {
    this.list.cards.push(newCard);
    this.isAddingCard = false;
  }

  onCardCancel() {
    this.isAddingCard = false;
  }

  moveList() {
    console.log('Liste déplacée');
    this.dropdownOpen = false; // Close the dropdown after the action
  }

  markAsComplete() {
    console.log(`Liste "${this.list.title}" marquée comme complète.`);
  }

  editList() {
    this.editedList = { ...this.list }; // Set the current list data for editing
    this.isEditingList = true; // Show the edit list form
    this.dropdownOpen = false; // Close the dropdown
  }

  deleteList() {
    this.boardService.deleteList(this.list.id); // Use the service to delete the list
    console.log(`Liste "${this.list.title}" supprimée.`);
    // Optionally, you can emit an event to notify the parent component to remove the list from the UI
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.list.cards, event.previousIndex, event.currentIndex);
    } else {
      console.warn('Déplacement entre les listes non géré ici.');
    }
  }

  onEditListSave(updatedList: List) {
    this.list.title = updatedList.title; // Update the list title
    this.list.color = updatedList.color; // Update the list color
    this.list.tags = updatedList.tags; // Update the list tags
    this.isEditingList = false; // Hide the edit list form
  }

  onEditListCancel() {
    this.isEditingList = false; // Hide the edit list form without saving
  }
}
