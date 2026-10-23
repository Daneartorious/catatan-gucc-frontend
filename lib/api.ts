import {
  Category,
  CreateCategoryPayload,
  CreateNotePayload,
  Note,
  UpdateCategoryPayload,
  UpdateNotePayload,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8088";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "Unknown error");
      throw new ApiError(errorText || `Request failed with status ${res.status}`, res.status);
    }

    // Check if response has content before parsing JSON
    const text = await res.text();
    if (!text) {
      return {} as T;
    }
    return JSON.parse(text) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(
      `Tidak dapat terhubung ke server Go di ${API_BASE_URL}. Pastikan backend berjalan di port 8088.`
    );
  }
}

// Categories API
export async function getCategories(): Promise<Category[]> {
  const data = await request<Category[] | null>("/categories");
  return data || [];
}

export async function getCategoryById(id: number): Promise<Category> {
  return request<Category>(`/categories/${id}`);
}

export async function createCategory(payload: CreateCategoryPayload): Promise<Category> {
  return request<Category>("/categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateCategory(
  id: number,
  payload: UpdateCategoryPayload
): Promise<Category> {
  return request<Category>(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteCategory(id: number): Promise<{ message: string }> {
  return request<{ message: string }>(`/categories/${id}`, {
    method: "DELETE",
  });
}

// Notes API
export async function getNotes(): Promise<Note[]> {
  const data = await request<Note[] | null>("/notes");
  return data || [];
}

export async function getNoteById(id: number): Promise<Note> {
  return request<Note>(`/notes/${id}`);
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  return request<Note>("/notes", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateNote(
  id: number,
  payload: UpdateNotePayload
): Promise<Note> {
  return request<Note>(`/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteNote(id: number): Promise<{ message: string }> {
  return request<{ message: string }>(`/notes/${id}`, {
    method: "DELETE",
  });
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      method: "GET",
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}
