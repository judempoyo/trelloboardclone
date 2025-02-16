import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from '../models';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-list-detail',
  standalone: false,
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css' 
  ]
})
export class ListDetailComponent implements OnInit {
  list!: List | undefined;
  boardId!: string; 

  constructor(private route: ActivatedRoute, private boardService: BoardService) {}

  ngOnInit(): void {
    
    this.boardId = this.route.snapshot.paramMap.get('boardId')!;
    const listId = this.route.snapshot.paramMap.get('id');

    if (this.boardId && listId) {
      
      const board = this.boardService.getBoard(this.boardId);
      if (board) {
     
        this.list = board.lists.find(l => l.id === listId);
      }
    }
  }
}
