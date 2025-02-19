import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-celebration',
  standalone: false,
  
  templateUrl: './celebration.component.html',
  styleUrl: './celebration.component.css'
})
 
export class CelebrationComponent implements OnInit {
  confettiCount = 100; // Nombre de confettis à générer

  constructor() {}

  ngOnInit(): void {
    this.createConfetti();
  }
  createConfetti() {
    const container = document.querySelector('.celebration-container');
    for (let i = 0; i < this.confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = Math.random() * 100 + 'vw'; // Position aléatoire
      confetti.style.backgroundColor = this.getRandomColor(); // Couleur aléatoire
      container?.appendChild(confetti);
      // Supprimer le confetti après l'animation
      setTimeout(() => {
        confetti.remove();
      }, 2000);
    }
    console.log('conftit creer')
  }

  getRandomColor() {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}