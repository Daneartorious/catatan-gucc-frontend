type Note = {
    id: number;
    category_id: number | null;
    title: string;
    content: string;
    category_name: string | null;
};

async function getNotes(): Promise<Note[]> {
  const res = await fetch("http://localhost:8088/notes", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data catatan");
  }

  return res.json();
}

export default async function NotesPage() {
    const notes = await getNotes();

    return (
        <div>
            <h1>Semua Catatan</h1>
            {notes.map((note) => (
                <div key={note.id}>
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
                    <p>{note.category_name}</p>
                </div>
            ))}
        </div>
    )
}