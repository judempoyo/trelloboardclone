import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { Board } from '../models';
import { Router } from '@angular/router'; // Importer Router

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  boards!: Board[];

  constructor(private boardService: BoardService, private router: Router) {}

  ngOnInit(): void {
    this.boards = this.boardService.getBoards();
  }

  selectBoard(boardId: string) {
    this.router.navigate(['/board', boardId]); 
  }
}
