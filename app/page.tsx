import NoteCard from "./components/NoteCard";

export default function Home() {
  return (
    <div>
      <h1>Catatan Belajar Saya</h1>
      <NoteCard title="Belajar Golang" content="Puyeng debugging"/>
      <NoteCard title="Belajar Next.js" content="Component itu mirip function di Go, tapi buat UI"/>
    </div>
  );
}

