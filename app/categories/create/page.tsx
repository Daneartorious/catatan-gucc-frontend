"use client";

import { useState } from "react";

export default function CreateCategoryForm() {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        const res = await fetch("http://localhost:8088/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                name: name,
            })
        })
        if (!res.ok) {
            const errText = await res.text();
            setError(errText);
            return
        }

        setName("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="Judul"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Simpan Catatan</button>
        </form>
    )
}