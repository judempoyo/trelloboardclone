import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDetailComponent } from './list-detail/list-detail.component';

const routes: Routes = [
  { path: 'list/:id', component: ListDetailComponent }, // Route pour les détails de la liste
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
