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
  checklist?: ChecklistItem[];
  isCompleted?: boolean;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
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
  isCompleted?: boolean;
}

export interface Board {
  id: string;
  title: string;
  lists: List[];
  backgroundColor?: string;
  members?: string[];
  favorites?:string[];}
