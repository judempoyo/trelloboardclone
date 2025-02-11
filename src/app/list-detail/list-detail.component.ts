import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from '../models';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-list-detail',
  standalone: false,

  templateUrl: './list-detail.component.html',
  styleUrl: './list-detail.component.css'
})

export class ListDetailComponent implements OnInit {
  list!: List | undefined;

  constructor(private route: ActivatedRoute, private boardService: BoardService) {}

  ngOnInit(): void {
    const listId = this.route.snapshot.paramMap.get('id');
    if (listId) {
      this.list = this.boardService.getBoard().lists.find(l => l.id === listId);
    }
  }
}
