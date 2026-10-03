"use client"

import { useState } from "react";

type NoteCardProps = {
    title: string;
    content: string;
};

export default function NoteCard({ title, content }: NoteCardProps) {
    const [isRead, setIsRead] = useState(false);
    return (
        <div>
            <h2>{title}</h2>
            <p>{content}</p>
            <p>Status: {isRead ? "Sudah dibaca" : "Belum dibaca"}</p>
            <button onClick={() => setIsRead(true)}>Tandai sudah dibaca</button>
        </div>
    )
}