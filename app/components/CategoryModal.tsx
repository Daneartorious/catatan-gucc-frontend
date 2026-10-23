"use client";

import { useState } from "react";
import { Category } from "@/types";
import { createCategory, updateCategory, deleteCategory } from "@/lib/api";
import { X, Plus, Edit2, Trash2, Check, AlertCircle, FolderOpen } from "lucide-react";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onRefresh: () => Promise<void>;
  onShowToast: (msg: string, type: "success" | "error") => void;
}

export default function CategoryModal({
  isOpen,
  onClose,
  categories,
  onRefresh,
  onShowToast,
}: CategoryModalProps) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  if (!isOpen) return null;

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      setError("Nama kategori tidak boleh kosong");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await createCategory({ name: newCategoryName.trim() });
      setNewCategoryName("");
      await onRefresh();
      onShowToast("Kategori berhasil ditambahkan", "success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal membuat kategori";
      setError(msg);
      onShowToast(msg, "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(id: number) {
    if (!editingName.trim()) {
      setError("Nama kategori tidak boleh kosong");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await updateCategory(id, { name: editingName.trim() });
      setEditingId(null);
      await onRefresh();
      onShowToast("Kategori berhasil diperbarui", "success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal update kategori";
      setError(msg);
      onShowToast(msg, "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    setError(null);
    setLoading(true);
    try {
      await deleteCategory(id);
      setDeletingId(null);
      await onRefresh();
      onShowToast("Kategori berhasil dihapus", "success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus kategori";
      setError(msg);
      onShowToast(msg, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0b0d]/35 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white border border-[#dee1e6] rounded-[14px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#dee1e6] bg-[#f5f7fa]">
          <div className="flex items-center gap-2 text-[#0a0b0d] font-semibold text-sm">
            <FolderOpen className="w-4 h-4 text-[#1b2f6b]" />
            <span>Kelola Kategori</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#6a707a] hover:text-[#0a0b0d] hover:bg-white rounded-[8px] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Create Input */}
        <div className="p-5 border-b border-[#dee1e6] bg-[#f5f7fa]/30">
          <form onSubmit={handleCreate} className="flex gap-2">
            <input
              type="text"
              placeholder="Nama kategori baru..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              disabled={loading}
              className="flex-1 bg-white border border-[#dee1e6] rounded-[10px] px-3.5 py-2 text-xs text-[#0a0b0d] placeholder-[#6a707a] focus:outline-hidden focus:border-[#1b2f6b] shadow-[0_1px_3px_rgba(10,11,13,0.04)] transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !newCategoryName.trim()}
              className="inline-flex items-center gap-1.5 bg-[#1b2f6b] hover:bg-[#13224f] disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-[10px] transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah</span>
            </button>
          </form>

          {error && (
            <div className="mt-2.5 flex items-center gap-1.5 text-[#c0202d] text-xs font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Category List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 divide-y divide-[#dee1e6]/50">
          {categories.length === 0 ? (
            <div className="text-center py-8 text-[#6a707a] text-xs">
              Belum ada kategori. Buat satu di atas!
            </div>
          ) : (
            categories.map((cat) => (
              <div
                key={cat.id}
                className="pt-2 first:pt-0 flex items-center justify-between p-2 rounded-[10px] hover:bg-[#f5f7fa] transition-colors group"
              >
                {editingId === cat.id ? (
                  <div className="flex items-center gap-2 flex-1 mr-2">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="flex-1 bg-white border border-[#1b2f6b] rounded-[8px] px-2.5 py-1 text-xs text-[#0a0b0d] focus:outline-hidden"
                      autoFocus
                    />
                    <button
                      onClick={() => handleUpdate(cat.id)}
                      disabled={loading}
                      className="p-1 text-[#047a4a] hover:bg-[#e6f7ef] rounded cursor-pointer"
                      title="Simpan"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-1 text-[#6a707a] hover:bg-[#dee1e6]/50 rounded-[8px] cursor-pointer"
                      title="Batal"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-xs text-[#0a0b0d]">
                      <span className="font-mono tabular-nums text-[#6a707a]">#{cat.id}</span>
                      <span className="font-semibold">{cat.name}</span>
                    </div>

                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      {deletingId === cat.id ? (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-[#c0202d] mr-1 font-medium">Yakin?</span>
                          <button
                            onClick={() => handleDelete(cat.id)}
                            disabled={loading}
                            className="px-2 py-0.5 bg-[#c0202d] hover:bg-[#a01824] text-white text-xs rounded-[8px] font-semibold cursor-pointer"
                          >
                            Hapus
                          </button>
                          <button
                            onClick={() => setDeletingId(null)}
                            className="px-2 py-0.5 bg-[#eef0f3] hover:bg-[#dee1e6] text-[#0a0b0d] text-xs rounded-[8px] cursor-pointer"
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingId(cat.id);
                              setEditingName(cat.name);
                            }}
                            className="p-1.5 text-[#6a707a] hover:text-[#1b2f6b] hover:bg-white rounded transition-colors cursor-pointer"
                            title="Edit nama"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeletingId(cat.id)}
                            className="p-1.5 text-[#6a707a] hover:text-[#c0202d] hover:bg-[#fde9ea] rounded transition-colors cursor-pointer"
                            title="Hapus kategori"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#dee1e6] bg-[#f5f7fa] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-[#0a0b0d] bg-white hover:bg-[#f5f7fa] border border-[#dee1e6] shadow-[0_1px_3px_rgba(10,11,13,0.04)] rounded-[10px] transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
