
import { Component, Input } from '@angular/core';
import { List } from '../../models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  dropdownOpen: boolean = false;
  @Input() list!: List;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  copyList() {
    // Logique pour copier la liste
    console.log('Liste copiée');
    this.dropdownOpen = false; // Fermer le menu après l'action
  }

  addCard() {
    // Logique pour ajouter une carte
    console.log('Ajouter une carte');
    this.dropdownOpen = false; // Fermer le menu après l'action
    }

  moveList() {
    // Logique pour déplacer la liste
    console.log('Liste déplacée');
    this.dropdownOpen = false; // Fermer le menu après l'action
  }

  markAsComplete() {
    // Logique pour marquer la liste comme complète
    console.log(`Liste "${this.list.title}" marquée comme complète.`);
    // Vous pouvez également mettre à jour un état ou une propriété ici
  }

  editList() {
    // Logique pour modifier la liste
    console.log(`Modifier la liste "${this.list.title}".`);
    // Vous pouvez ouvrir un modal ou une autre interface pour modifier la liste
  }

  deleteList() {
    // Logique pour supprimer la liste
    console.log(`Liste "${this.list.title}" supprimée.`);
    // Vous pouvez également appeler un service pour supprimer la liste de la base de données
  }
  
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.list.cards, event.previousIndex, event.currentIndex);
    } else {
      console.warn('Déplacement entre les listes non géré ici.');
    }
  }
}
