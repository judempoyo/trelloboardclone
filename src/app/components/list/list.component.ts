/* import { Component, Input } from '@angular/core';
import { Card, List } from '../../models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BoardService } from '../../board.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  dropdownOpen: boolean = false;
  @Input() list!: List;
  @Input() boardId!: string;
  isAddingCard: boolean = false;
  isEditingList: boolean = false; // État pour afficher/cacher le formulaire d'édition de la liste
  editedList: List;

  constructor(private boardService: BoardService) {
    this.editedList = { id: '', title: '', cards: [] }; // Initialiser avec des valeurs par défaut
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  copyList() {
    const copiedList = this.boardService.copyList(this.boardId, this.list); // Utiliser le service pour copier la liste
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
    this.dropdownOpen = false; // Fermer le menu déroulant après l'action
  }

  markAsComplete() {
    this.boardService.markListAsComplete(this.boardId, this.list.id); // Marquer la liste comme complète
    console.log(`Liste "${this.list.title}" marquée comme complète.`);
  }

  editList() {
    this.editedList = { ...this.list }; // Définir les données de la liste actuelle pour l'édition
    this.isEditingList = true; // Afficher le formulaire d'édition de la liste
    this.dropdownOpen = false; // Fermer le menu déroulant
  }

  deleteList() {
    this.boardService.deleteList(this.boardId, this.list.id); // Utiliser le service pour supprimer la liste
    console.log(`Liste "${this.list.title}" supprimée.`);
    // Optionnellement, vous pouvez émettre un événement pour notifier le composant parent de supprimer la liste de l'UI
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.list.cards, event.previousIndex, event.currentIndex);
    } else {
      console.warn('Déplacement entre les listes non géré ici.');
    }
  }

  onEditListSave(updatedList: List) {
    this.list.title = updatedList.title; // Mettre à jour le titre de la liste
    this.list.color = updatedList.color; // Mettre à jour la couleur de la liste
    this.list.tags = updatedList.tags; // Mettre à jour les tags de la liste
    this.isEditingList = false; // Cacher le formulaire d'édition de la liste
  }

  onEditListCancel() {
    this.isEditingList = false; // Cacher le formulaire d'édition de la liste sans enregistrer
  }
} */

import { Component, Input } from '@angular/core';
import { Card, List } from '../../models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BoardService } from '../../board.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  dropdownOpen: boolean = false;
  @Input() list!: List;
  @Input() boardId!: string;
  isAddingCard: boolean = false;
  isEditingList: boolean = false; // État pour afficher/cacher le formulaire d'édition de la liste
  editedList: List;
  isEditingCard: boolean = false;
  cardToEdit!: Card;

  constructor(private boardService: BoardService, private dialog: MatDialog) {
    this.editedList = { id: '', title: '', cards: [] }; // Initialiser avec des valeurs par défaut
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  copyList() {
    const copiedList = this.boardService.copyList(this.boardId, this.list); // Utiliser le service pour copier la liste
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


  onEditCard(card: Card) {
    this.cardToEdit = card; // Stocker la carte à éditer
     console.log('Édition de la carte:', this.cardToEdit);
    this.isEditingCard = true;
  }

  onEditCardSave(updatedCard: Card) {
    const index = this.list.cards.findIndex(c => c.id === updatedCard.id);
    if (index !== -1) {
      this.list.cards[index] = updatedCard; // Mettre à jour la carte dans la liste
    }
    this.isEditingCard = false; // Fermer le modal
  }

  onEditCardCancel() {
    this.isEditingCard = false; // Fermer le modal sans enregistrer
  }
  moveList() {
    console.log('Liste déplacée');
    this.dropdownOpen = false; // Fermer le menu déroulant après l'action
  }

  markAsComplete() {
    this.boardService.markListAsComplete(this.boardId, this.list.id); // Marquer la liste comme complète
    console.log(`Liste "${this.list.title}" marquée comme complète.`);
  }

  editList() {
    this.editedList = { ...this.list }; // Définir les données de la liste actuelle pour l'édition
    this.isEditingList = true; // Afficher le formulaire d'édition de la liste
    this.dropdownOpen = false; // Fermer le menu déroulant
  }


  deleteList() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: this.list.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.boardService.deleteList(this.boardId, this.list.id);
        console.log(`Liste "${this.list.title}" supprimée.`);
      }
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.list.cards, event.previousIndex, event.currentIndex);
    } else {
      console.warn('Déplacement entre les listes non géré ici.');
    }
  }

  onEditListSave(updatedList: List) {
    this.list.title = updatedList.title; // Mettre à jour le titre de la liste
    this.list.color = updatedList.color; // Mettre à jour la couleur de la liste
    this.list.tags = updatedList.tags; // Mettre à jour les tags de la liste
    this.isEditingList = false; // Cacher le formulaire d'édition de la liste
  }

  onEditListCancel() {
    this.isEditingList = false; // Cacher le formulaire d'édition de la liste sans enregistrer
  }
}
