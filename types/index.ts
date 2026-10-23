export interface Category {
  id: number;
  name: string;
}

export interface Note {
  id: number;
  category_id: number | null;
  title: string;
  content: string;
  category_name: string | null;
}

export interface CreateNotePayload {
  category_id: number | null;
  title: string;
  content: string;
}

export interface UpdateNotePayload {
  category_id: number | null;
  title: string;
  content: string;
}

export interface CreateCategoryPayload {
  name: string;
}

export interface UpdateCategoryPayload {
  name: string;
}
