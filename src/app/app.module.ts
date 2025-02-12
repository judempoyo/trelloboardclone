import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { ListComponent } from './components/list/list.component';
import { CardComponent } from './components/card/card.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { CardFormComponent } from './components/card-form/card-form.component';
import { ListFormComponent } from './components/list-form/list-form.component';
import { BoardFormComponent } from './components/board-form/board-form.component';
import { ModalComponent } from './modal/modal.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ListComponent,
    CardComponent,
    CustomButtonComponent,
    CardFormComponent,
    ListFormComponent,
    BoardFormComponent,
    ModalComponent,
    ListDetailComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
