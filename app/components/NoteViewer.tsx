"use client";

import { useState } from "react";
import { Note } from "@/types";
import { getCategoryColor, calculateReadTime } from "@/lib/utils";
import {
  Edit3,
  Trash2,
  Copy,
  Check,
  FileText,
  Hash,
  ArrowLeft,
  Clock,
} from "lucide-react";

interface NoteViewerProps {
  note: Note | null;
  onEdit: () => void;
  onDelete: (id: number) => void;
  onOpenCreateNote: () => void;
  onShowToast: (msg: string, type: "success" | "error") => void;
  onBackMobile?: () => void;
}

export default function NoteViewer({
  note,
  onEdit,
  onDelete,
  onOpenCreateNote,
  onShowToast,
  onBackMobile,
}: NoteViewerProps) {
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!note) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#5b616e] bg-[#f5f7fa]/30">
        <div className="w-12 h-12 rounded-[14px] bg-white border border-[#dee1e6] flex items-center justify-center mb-4 text-[#6a707a] shadow-xs">
          <FileText className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-[#0a0b0d] mb-1">
          Pilih Catatan
        </h3>
        <p className="text-xs text-[#6a707a] max-w-sm mb-5 leading-relaxed">
          Pilih salah satu catatan dari daftar di samping untuk membaca detailnya,
          atau buat catatan baru langsung.
        </p>
        <button
          onClick={onOpenCreateNote}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1b2f6b] hover:bg-[#13224f] rounded-[10px] shadow-sm transition-all cursor-pointer"
        >
          <span>+ Buat Catatan Baru</span>
        </button>
      </div>
    );
  }

  const color = getCategoryColor(note.category_id);
  const wordCount = note.content.trim() ? note.content.trim().split(/\s+/).length : 0;

  async function handleCopy() {
    if (!note) return;
    try {
      await navigator.clipboard.writeText(`${note.title}\n\n${note.content}`);
      setCopied(true);
      onShowToast("Isi catatan berhasil disalin ke clipboard", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onShowToast("Gagal menyalin teks", "error");
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Action Toolbar */}
      <div className="px-6 py-3.5 border-b border-[#dee1e6] bg-[#f5f7fa]/50 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          {onBackMobile && (
            <button
              onClick={onBackMobile}
              className="md:hidden p-1.5 -ml-2 text-[#6a707a] hover:text-[#0a0b0d] hover:bg-white rounded-[8px] transition-colors cursor-pointer"
              title="Kembali ke daftar"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-[8px] text-xs font-semibold border ${color.bg} ${color.text} ${color.border}`}
          >
            <span>{note.category_name || "Tanpa Kategori"}</span>
          </span>

          <span className="text-xs font-mono tabular-nums text-[#6a707a] flex items-center gap-0.5">
            <Hash className="w-3 h-3 text-[#6a707a]" />
            <span>{note.id}</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-semibold text-[#0a0b0d] bg-white hover:bg-[#f5f7fa] border border-[#dee1e6] shadow-[0_1px_3px_rgba(10,11,13,0.04)] transition-colors cursor-pointer"
            title="Salin isi catatan"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#047a4a]" />
                <span className="text-[#047a4a]">Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#6a707a]" />
                <span>Salin</span>
              </>
            )}
          </button>

          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] text-xs font-semibold text-white bg-[#1b2f6b] hover:bg-[#13224f] shadow-xs transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>

          {confirmDelete ? (
            <div className="flex items-center gap-1 bg-[#fde9ea] border border-[#c0202d]/30 rounded-[10px] p-0.5">
              <span className="text-[11px] text-[#c0202d] px-2 font-medium">Hapus?</span>
              <button
                onClick={() => {
                  onDelete(note.id);
                  setConfirmDelete(false);
                }}
                className="px-2 py-1 bg-[#c0202d] hover:bg-[#a01824] text-white text-xs font-semibold rounded-[8px] cursor-pointer"
              >
                Ya
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-2 py-1 text-[#5b616e] hover:text-[#0a0b0d] text-xs rounded-[8px] cursor-pointer"
              >
                Batal
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="p-1.5 rounded-[10px] text-[#6a707a] hover:text-[#c0202d] hover:bg-[#fde9ea] transition-colors cursor-pointer"
              title="Hapus catatan ini"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Note Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-4xl">
        {/* Title & Metadata Header */}
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-[#0a0b0d] leading-snug">
            {note.title}
          </h1>
          <div className="flex items-center gap-2.5 text-xs text-[#6a707a] tabular-nums font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#6a707a]" />
              <span>{calculateReadTime(note.content)}</span>
            </span>
            <span>•</span>
            <span>{wordCount} kata</span>
            <span>•</span>
            <span>{note.content.length} karakter</span>
          </div>
        </div>

        <div className="w-full h-px bg-[#dee1e6]/80" />

        {/* Body Text */}
        <div className="text-sm md:text-base text-[#0a0b0d]/90 leading-relaxed font-normal whitespace-pre-wrap selection:bg-[#1b2f6b]/15">
          {note.content}
        </div>
      </div>
    </div>
  );
}
