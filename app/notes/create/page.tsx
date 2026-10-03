"use client";

import { useState } from "react";

export default function CreateNoteForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        const res = await fetch("http://localhost:8088/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                category_id: Number(categoryId),
                title: title,
                content: content,
            })
        })
        if (!res.ok) {
            const errText = await res.text();
            setError(errText);
            return
        }

        setTitle("");
        setContent("");
        setCategoryId("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="Judul"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Isi catatan"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <input
                type="number"
                placeholder="ID Kategori"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Simpan Catatan</button>
        </form>
    )
}