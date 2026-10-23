"use client";

import { useMemo, useState } from "react";
import { Note, Category } from "@/types";
import { getCategoryColor, truncateText, calculateReadTime } from "@/lib/utils";
import {
  Search,
  X,
  SlidersHorizontal,
  Trash2,
  FileText,
  Plus,
  Clock,
} from "lucide-react";

interface NoteListProps {
  notes: Note[];
  categories: Category[];
  selectedCategoryId: number | null;
  selectedNoteId: number | null;
  onSelectNote: (id: number) => void;
  onOpenCreateNote: () => void;
  onDeleteNote: (id: number, e: React.MouseEvent) => void;
  onClearCategoryFilter: () => void;
}

type SortOption = "newest" | "oldest" | "title-asc";

export default function NoteList({
  notes,
  categories,
  selectedCategoryId,
  selectedNoteId,
  onSelectNote,
  onOpenCreateNote,
  onDeleteNote,
  onClearCategoryFilter,
}: NoteListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [deletingNoteId, setDeletingNoteId] = useState<number | null>(null);

  // Determine active category name
  const currentCategory = useMemo(() => {
    if (selectedCategoryId === null) return null;
    return categories.find((c) => c.id === selectedCategoryId) || null;
  }, [categories, selectedCategoryId]);

  // Filter notes by category and search query
  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) => {
        if (selectedCategoryId !== null && note.category_id !== selectedCategoryId) {
          return false;
        }
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        const matchTitle = note.title.toLowerCase().includes(q);
        const matchContent = note.content.toLowerCase().includes(q);
        const matchCategory = note.category_name?.toLowerCase().includes(q);
        return matchTitle || matchContent || matchCategory;
      })
      .sort((a, b) => {
        if (sortBy === "newest") return b.id - a.id;
        if (sortBy === "oldest") return a.id - b.id;
        if (sortBy === "title-asc") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [notes, selectedCategoryId, searchQuery, sortBy]);

  return (
    <div className="w-80 md:w-96 border-r border-[#dee1e6] bg-white flex flex-col h-full shrink-0">
      {/* Search Header */}
      <div className="p-3.5 border-b border-[#dee1e6] bg-[#f5f7fa]/50 space-y-2.5">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#6a707a] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari catatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#dee1e6] rounded-[10px] pl-8.5 pr-8 py-2 text-xs text-[#0a0b0d] placeholder-[#6a707a] focus:outline-hidden focus:border-[#1b2f6b] focus:ring-1 focus:ring-[#1b2f6b]/20 shadow-[0_1px_3px_rgba(10,11,13,0.04)] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6a707a] hover:text-[#0a0b0d] p-0.5 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Filter status & Sorting bar */}
        <div className="flex items-center justify-between text-[11px] text-[#5b616e]">
          <div className="flex items-center gap-1.5 truncate">
            {currentCategory ? (
              <span className="inline-flex items-center gap-1 bg-[#eef1f9] text-[#1b2f6b] border border-[#dee1e6] px-2 py-0.5 rounded-full text-[10px] font-semibold truncate">
                <span>{currentCategory.name}</span>
                <button
                  onClick={onClearCategoryFilter}
                  className="hover:text-[#13224f] cursor-pointer ml-0.5"
                  title="Hapus filter"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ) : (
              <span className="text-[#0a0b0d] font-semibold">Semua Catatan</span>
            )}
            <span className="text-[#6a707a] text-[10px] tabular-nums font-medium">
              ({filteredNotes.length})
            </span>
          </div>

          <div className="flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-[#6a707a]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-[#5b616e] hover:text-[#0a0b0d] text-[11px] cursor-pointer focus:outline-hidden border-none font-medium"
            >
              <option value="newest" className="bg-white text-[#0a0b0d]">
                Terbaru
              </option>
              <option value="oldest" className="bg-white text-[#0a0b0d]">
                Terlama
              </option>
              <option value="title-asc" className="bg-white text-[#0a0b0d]">
                Judul (A-Z)
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Note List Scrollable Area */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#dee1e6]/40 p-2 space-y-1">
        {filteredNotes.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center text-[#5b616e]">
            <div className="w-10 h-10 rounded-[10px] bg-[#f5f7fa] border border-[#dee1e6] flex items-center justify-center mb-3 text-[#6a707a]">
              <FileText className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-[#0a0b0d] mb-1">
              Tidak ada catatan
            </p>
            <p className="text-[11px] text-[#6a707a] max-w-xs mb-4">
              {searchQuery
                ? `Tidak ada hasil yang cocok dengan "${searchQuery}".`
                : "Belum ada catatan yang tersimpan di sini."}
            </p>
            <button
              onClick={onOpenCreateNote}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#1b2f6b] hover:bg-[#13224f] rounded-[10px] transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tulis Catatan</span>
            </button>
          </div>
        ) : (
          filteredNotes.map((note) => {
            const isSelected = selectedNoteId === note.id;
            const color = getCategoryColor(note.category_id);
            const isDeleting = deletingNoteId === note.id;

            return (
              <div
                key={note.id}
                onClick={() => onSelectNote(note.id)}
                className={`relative group p-3 rounded-[14px] border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#eef1f9]/70 border-[#cddffc] shadow-[0_2px_8px_rgba(27,47,107,0.05)]"
                    : "bg-white border-transparent hover:bg-[#f5f7fa]/80 hover:border-[#dee1e6]"
                }`}
              >
                {/* Active indicator bar on left */}
                {isSelected && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#1b2f6b] rounded-r" />
                )}

                {/* Top line: Category pill + Note ID & Actions */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-[6px] text-[10px] font-semibold border ${color.bg} ${color.text} ${color.border}`}
                  >
                    <span className="truncate max-w-[120px]">
                      {note.category_name || "Tanpa Kategori"}
                    </span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono tabular-nums text-[#6a707a]">
                      #{note.id}
                    </span>

                    {/* Safe Deletion Guard */}
                    {isDeleting ? (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 bg-[#fde9ea] border border-[#c0202d]/30 rounded-[6px] px-1.5 py-0.5"
                      >
                        <span className="text-[10px] text-[#c0202d] font-semibold">Hapus?</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteNote(note.id, e);
                            setDeletingNoteId(null);
                          }}
                          className="px-1.5 py-0.5 bg-[#c0202d] hover:bg-[#a01824] text-white text-[10px] font-semibold rounded-[4px] cursor-pointer"
                        >
                          Ya
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletingNoteId(null);
                          }}
                          className="px-1.5 py-0.5 text-[#5b616e] hover:text-[#0a0b0d] text-[10px] rounded-[4px] cursor-pointer"
                        >
                          Batal
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeletingNoteId(note.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 hover:text-[#c0202d] text-[#6a707a] p-1 rounded-[6px] hover:bg-[#fde9ea] transition-all cursor-pointer"
                        title="Hapus catatan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Note Title */}
                <h3
                  className={`text-xs font-semibold tracking-tight mb-1 truncate ${
                    isSelected ? "text-[#0a0b0d]" : "text-[#0a0b0d]/90"
                  }`}
                >
                  {note.title}
                </h3>

                {/* Content excerpt */}
                <p className="text-[11px] text-[#5b616e] line-clamp-2 leading-relaxed mb-2">
                  {truncateText(note.content, 90)}
                </p>

                {/* Card subtle metadata footer */}
                <div className="flex items-center gap-1 text-[10px] text-[#6a707a] tabular-nums font-medium">
                  <Clock className="w-2.5 h-2.5 text-[#6a707a]" />
                  <span>{calculateReadTime(note.content)}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
