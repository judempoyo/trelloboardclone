import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardFormComponent } from './board-form.component';

describe('BoardFormComponentComponent', () => {
  let component: BoardFormComponent;
  let fixture: ComponentFixture<BoardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
