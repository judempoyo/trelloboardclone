import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './components/board/board.component';

const routes: Routes = [
  { path: 'board/:boardId/list/:id', component: ListDetailComponent },
  { path: '', component: HomeComponent },
  { path: 'board/:id', component: BoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
