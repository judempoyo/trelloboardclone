export interface Card {
  id: string;
  title: string;
  description?: string;
  labels?: string[];
  dueDate?: Date;
  comments?: Comment[];
  priority?: 'low' | 'medium' | 'high';
  assignedTo?: string[];
  color?: string;
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
  color?: string;
  tags?: string[];
}

export interface Board {
  id: string;
  title: string;
  lists: List[];
  backgroundColor?: string;
  members?: string[];
  favorites?:string[];}
