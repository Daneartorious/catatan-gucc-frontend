"use client";

import { useEffect, useState } from "react";
import { Note, Category } from "@/types";
import {
  Save,
  X,
  AlertCircle,
  FolderPlus,
  ArrowLeft,
} from "lucide-react";

interface NoteEditorProps {
  note: Note | null; // If provided, edit mode; otherwise, create mode
  categories: Category[];
  defaultCategoryId: number | null;
  onSave: (payload: {
    category_id: number | null;
    title: string;
    content: string;
  }) => Promise<void>;
  onCancel: () => void;
  onOpenCategoryModal: () => void;
}

export default function NoteEditor({
  note,
  categories,
  defaultCategoryId,
  onSave,
  onCancel,
  onOpenCategoryModal,
}: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [categoryId, setCategoryId] = useState<number | null>(
    note ? note.category_id : defaultCategoryId
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCategoryId(note.category_id);
    } else {
      setTitle("");
      setContent("");
      setCategoryId(defaultCategoryId);
    }
    setError(null);
  }, [note, defaultCategoryId]);

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!title.trim()) {
      setError("Judul catatan wajib diisi.");
      return;
    }
    if (!content.trim()) {
      setError("Isi catatan tidak boleh kosong.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await onSave({
        category_id: categoryId,
        title: title.trim(),
        content: content.trim(),
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan catatan";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  // Keyboard shortcut Ctrl+Enter or Cmd+Enter to save
  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  const isEditMode = !!note;
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <div
      onKeyDown={handleKeyDown}
      className="flex-1 flex flex-col h-full bg-white overflow-hidden"
    >
      {/* Top Toolbar */}
      <div className="px-6 py-3.5 border-b border-[#dee1e6] bg-[#f5f7fa]/60 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="md:hidden p-1.5 -ml-2 text-[#6a707a] hover:text-[#0a0b0d] hover:bg-white rounded-[8px] transition-colors cursor-pointer"
            title="Kembali ke daftar"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold text-[#0a0b0d]">
            {isEditMode ? `Edit Catatan #${note.id}` : "Catatan Baru"}
          </span>
          <span className="text-[10px] font-semibold text-[#1b2f6b] bg-[#eef1f9] border border-[#dee1e6] px-2 py-0.5 rounded-[8px]">
            Draft
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-semibold text-[#5b616e] hover:text-[#0a0b0d] hover:bg-white bg-white/60 border border-[#dee1e6] shadow-[0_1px_3px_rgba(10,11,13,0.04)] transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Batal</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={loading || !title.trim() || !content.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-[10px] text-xs font-semibold text-white bg-[#1b2f6b] hover:bg-[#13224f] disabled:opacity-50 shadow-xs transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{loading ? "Menyimpan..." : isEditMode ? "Perbarui" : "Simpan"}</span>
            <span className="hidden sm:inline text-[10px] opacity-80 font-mono tabular-nums ml-1">
              (Ctrl+Enter)
            </span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-5 max-w-4xl w-full">
        {error && (
          <div className="p-3.5 rounded-[12px] bg-[#fde9ea] border border-[#c0202d]/30 text-[#c0202d] text-xs font-medium flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#c0202d]" />
            <span>{error}</span>
          </div>
        )}

        {/* Category Picker Bar */}
        <div className="flex flex-wrap items-center gap-3 p-3 bg-[#f5f7fa] border border-[#dee1e6] rounded-[12px]">
          <label className="text-xs font-semibold text-[#5b616e] shrink-0">
            Kategori:
          </label>

          {categories.length === 0 ? (
            <div className="flex items-center gap-2 text-xs text-[#8a5a00]">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Belum ada kategori tersedia.</span>
              <button
                type="button"
                onClick={onOpenCategoryModal}
                className="text-xs text-[#1b2f6b] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span>Buat Sekarang</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-1">
              <select
                value={categoryId ?? ""}
                onChange={(e) =>
                  setCategoryId(e.target.value === "" ? null : Number(e.target.value))
                }
                className="bg-white border border-[#dee1e6] rounded-[8px] px-3 py-1.5 text-xs text-[#0a0b0d] font-medium focus:outline-hidden focus:border-[#1b2f6b] transition-colors cursor-pointer"
              >
                <option value="">— Tanpa Kategori —</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    #{cat.id} — {cat.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={onOpenCategoryModal}
                className="text-xs text-[#5b616e] hover:text-[#1b2f6b] p-1.5 rounded hover:bg-white transition-colors inline-flex items-center gap-1 cursor-pointer font-medium"
                title="Tambah atau kelola kategori"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Kelola Kategori</span>
              </button>
            </div>
          )}
        </div>

        {/* Title Input */}
        <div>
          <input
            type="text"
            placeholder="Judul catatan..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-xl md:text-2xl font-semibold text-[#0a0b0d] placeholder-[#6a707a] border-none focus:outline-hidden tracking-tight"
            autoFocus
          />
        </div>

        <div className="w-full h-px bg-[#dee1e6]" />

        {/* Content Textarea */}
        <div className="flex-1 flex flex-col min-h-[350px]">
          <textarea
            placeholder="Tuliskan catatan, ide, penjelasan, atau snippet di sini..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full flex-1 min-h-[350px] bg-transparent text-sm md:text-base text-[#0a0b0d] placeholder-[#6a707a] border-none focus:outline-hidden resize-none leading-relaxed font-normal selection:bg-[#1b2f6b]/15"
          />
        </div>

        {/* Bottom meta stats */}
        <div className="pt-4 border-t border-[#dee1e6] flex items-center justify-between text-xs text-[#6a707a] tabular-nums font-medium">
          <div className="flex items-center gap-3">
            <span>{wordCount} kata</span>
            <span>•</span>
            <span>{charCount} karakter</span>
          </div>
          <div className="text-[#6a707a] text-[11px]">
            Plaintext editor
          </div>
        </div>
      </div>
    </div>
  );
}
