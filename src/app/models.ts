

export interface Card {
  id: string;
  title: string;
  description?: string;
  labels?: string[];
  dueDate?: Date;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  date: Date; 
}

export interface List {
  id: string;
  title: string;
  cards: Card[];
}

export interface Board {
  id: string;
  title: string;
  lists: List[];
}
