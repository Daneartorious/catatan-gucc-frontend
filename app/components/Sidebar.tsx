"use client";

import { Category, Note } from "@/types";
import {
  FolderPlus,
  Plus,
  Server,
  Layers,
} from "lucide-react";

interface SidebarProps {
  categories: Category[];
  notes: Note[];
  selectedCategoryId: number | null;
  onSelectCategory: (id: number | null) => void;
  onOpenCreateNote: () => void;
  onOpenCategoryModal: () => void;
}

export default function Sidebar({
  categories,
  notes,
  selectedCategoryId,
  onSelectCategory,
  onOpenCreateNote,
  onOpenCategoryModal,
}: SidebarProps) {
  // Compute counts per category
  const noteCounts = notes.reduce<Record<number, number>>((acc, note) => {
    if (note.category_id !== null) {
      acc[note.category_id] = (acc[note.category_id] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <aside className="w-64 border-r border-[#dee1e6] bg-[#f5f7fa] flex flex-col h-full select-none shrink-0">
      {/* Brand Header */}
      <div className="px-5 py-4 border-b border-[#dee1e6] flex items-center justify-between bg-white">
        <h1 className="text-base font-semibold text-[#0a0b0d] tracking-tight">
          Catatan
        </h1>
      </div>

      {/* Primary Action: New Note Button */}
      <div className="p-3.5">
        <button
          onClick={onOpenCreateNote}
          className="w-full flex items-center justify-center gap-2 bg-[#1b2f6b] hover:bg-[#13224f] active:bg-[#13224f] text-white text-xs font-semibold py-2.5 px-3.5 rounded-[10px] shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Catatan Baru</span>
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        {/* Workspace section */}
        <div>
          <div className="px-2 mb-2 text-[11px] font-semibold tracking-wider uppercase text-[#6a707a]">
            Tampilan
          </div>
          <button
            onClick={() => onSelectCategory(null)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-[10px] text-xs font-medium transition-colors cursor-pointer ${
              selectedCategoryId === null
                ? "bg-white text-[#0a0b0d] border border-[#dee1e6] shadow-[0_1px_3px_rgba(10,11,13,0.04)] font-semibold"
                : "text-[#5b616e] hover:text-[#0a0b0d] hover:bg-white/60"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-3.5 h-3.5 text-[#1b2f6b]" />
              <span>Semua Catatan</span>
            </div>
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full tabular-nums ${
                selectedCategoryId === null
                  ? "bg-[#eef1f9] text-[#1b2f6b]"
                  : "bg-[#eef0f3] text-[#5b616e]"
              }`}
            >
              {notes.length}
            </span>
          </button>
        </div>

        {/* Categories Section */}
        <div>
          <div className="px-2 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#6a707a]">
              Kategori
            </span>
            <button
              onClick={onOpenCategoryModal}
              className="text-xs text-[#1b2f6b] hover:text-[#13224f] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              title="Kelola & Tambah Kategori"
            >
              <FolderPlus className="w-3 h-3" />
              <span>Kelola</span>
            </button>
          </div>

          <div className="space-y-1">
            {categories.length === 0 ? (
              <div className="px-2.5 py-3 text-[11px] text-[#6a707a] italic">
                Belum ada kategori. Klik &apos;Kelola&apos; untuk membuat.
              </div>
            ) : (
              categories.map((cat) => {
                const isSelected = selectedCategoryId === cat.id;
                const count = noteCounts[cat.id] || 0;

                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-[10px] text-xs font-medium transition-colors cursor-pointer group ${
                      isSelected
                        ? "bg-white text-[#0a0b0d] border border-[#dee1e6] shadow-[0_1px_3px_rgba(10,11,13,0.04)] font-semibold"
                        : "text-[#5b616e] hover:text-[#0a0b0d] hover:bg-white/60"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="truncate">{cat.name}</span>
                    </div>
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 tabular-nums ${
                        isSelected
                          ? "bg-[#eef1f9] text-[#1b2f6b]"
                          : "bg-[#eef0f3] text-[#5b616e]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3.5 border-t border-[#dee1e6] bg-[#f5f7fa] text-xs text-[#5b616e]">
        <div className="flex items-center justify-between tabular-nums">
          <span className="flex items-center gap-1 text-[#5b616e]">
            <Server className="w-3 h-3 text-[#6a707a]" />
            <span>Go HTTP :8088</span>
          </span>
          <span className="text-[#047a4a] font-medium bg-[#e6f7ef] px-2 py-0.5 rounded-full text-[10px]">
            ✓ PostgreSQL
          </span>
        </div>
      </div>
    </aside>
  );
}
