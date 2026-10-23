"use client";

import { useEffect, useState, useCallback } from "react";
import { Category, Note } from "@/types";
import {
  getNotes,
  getCategories,
  createNote,
  updateNote,
  deleteNote,
  checkBackendHealth,
} from "@/lib/api";
import Sidebar from "./components/Sidebar";
import NoteList from "./components/NoteList";
import NoteViewer from "./components/NoteViewer";
import NoteEditor from "./components/NoteEditor";
import CategoryModal from "./components/CategoryModal";
import ToastContainer, { ToastMessage } from "./components/Toast";
import {
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [editorMode, setEditorMode] = useState<"idle" | "create" | "edit">("idle");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [backendOnline, setBackendOnline] = useState(true);
  const [isCheckingBackend, setIsCheckingBackend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Mobile drawer controls
  const [mobileTab, setMobileTab] = useState<"nav" | "list" | "detail">("list");

  const showToast = useCallback((message: string, type: "success" | "error") => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const loadData = useCallback(async () => {
    try {
      const [fetchedCategories, fetchedNotes] = await Promise.all([
        getCategories(),
        getNotes(),
      ]);
      setCategories(fetchedCategories);
      setNotes(fetchedNotes);
      setBackendOnline(true);

      // Auto-select first note if none selected yet
      setSelectedNoteId((prev) => (prev !== null ? prev : (fetchedNotes[0]?.id ?? null)));
    } catch {
      setBackendOnline(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyBackend = useCallback(async () => {
    setIsCheckingBackend(true);
    const isUp = await checkBackendHealth();
    setBackendOnline(isUp);
    if (isUp) {
      await loadData();
      showToast("Backend terhubung dengan sukses!", "success");
    } else {
      showToast("Gagal terhubung ke Go backend (port 8088)", "error");
    }
    setIsCheckingBackend(false);
  }, [loadData, showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Global keydown shortcut for 'n' to trigger create note
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

      if ((e.key === "n" || e.key === "N") && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setEditorMode("create");
        setMobileTab("detail");
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Currently selected note object
  const selectedNote = notes.find((n) => n.id === selectedNoteId) || null;

  async function handleSaveNote(payload: {
    category_id: number | null;
    title: string;
    content: string;
  }) {
    if (editorMode === "create") {
      const newNote = await createNote(payload);
      setNotes((prev) => [newNote, ...prev]);
      setSelectedNoteId(newNote.id);
      setEditorMode("idle");
      showToast("Catatan baru berhasil dibuat", "success");
      await loadData();
    } else if (editorMode === "edit" && selectedNoteId !== null) {
      const updated = await updateNote(selectedNoteId, payload);
      setNotes((prev) =>
        prev.map((n) => (n.id === selectedNoteId ? { ...n, ...updated } : n))
      );
      setEditorMode("idle");
      showToast("Catatan berhasil diperbarui", "success");
      await loadData();
    }
    setMobileTab("detail");
  }

  async function handleDeleteNote(id: number, e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (selectedNoteId === id) {
        const remaining = notes.filter((n) => n.id !== id);
        setSelectedNoteId(remaining.length > 0 ? remaining[0].id : null);
      }
      showToast("Catatan berhasil dihapus", "success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus catatan";
      showToast(msg, "error");
    }
  }

  function handleSelectNote(id: number) {
    setSelectedNoteId(id);
    setEditorMode("idle");
    setMobileTab("detail");
  }

  function handleOpenCreateNote() {
    setEditorMode("create");
    setMobileTab("detail");
  }

  function handleOpenEditNote() {
    setEditorMode("edit");
    setMobileTab("detail");
  }

  function handleSelectCategory(id: number | null) {
    setSelectedCategoryId(id);
    setMobileTab("list");
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-white text-[#0a0b0d] antialiased">
      {/* Top Warning Banner if Backend is Offline */}
      {!backendOnline && (
        <div className="bg-[#fde9ea] border-b border-[#c0202d]/20 px-4 py-2.5 flex items-center justify-between text-xs text-[#c0202d] shrink-0">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#c0202d] shrink-0" />
            <span>
              <strong>Backend Offline:</strong> Tidak dapat terhubung ke Go API di{" "}
              <code className="bg-white/90 border border-[#c0202d]/20 px-1.5 py-0.5 rounded-[6px] text-[#c0202d] font-mono tabular-nums">
                http://localhost:8088
              </code>
              . Jalankan server dengan <code className="bg-white/90 border border-[#c0202d]/20 px-1.5 py-0.5 rounded-[6px] font-mono">go run main.go</code>.
            </span>
          </div>
          <button
            onClick={verifyBackend}
            disabled={isCheckingBackend}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#c0202d] hover:bg-[#a01824] active:scale-95 text-white font-semibold rounded-[8px] transition-all cursor-pointer text-xs shrink-0 shadow-xs"
          >
            <RefreshCw
              className={`w-3 h-3 ${isCheckingBackend ? "animate-spin" : ""}`}
            />
            <span>Coba Lagi</span>
          </button>
        </div>
      )}

      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-2.5 border-b border-[#dee1e6] bg-white">
        <h1 className="text-xs font-semibold text-[#0a0b0d]">Catatan</h1>

        <div className="flex items-center gap-1 bg-[#f5f7fa] border border-[#dee1e6] p-0.5 rounded-[10px] text-xs">
          <button
            onClick={() => setMobileTab("nav")}
            className={`px-2.5 py-1 rounded-[8px] font-medium transition-colors ${
              mobileTab === "nav" ? "bg-white text-[#0a0b0d] shadow-xs font-semibold" : "text-[#5b616e]"
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => setMobileTab("list")}
            className={`px-2.5 py-1 rounded-[8px] font-medium transition-colors ${
              mobileTab === "list" ? "bg-white text-[#0a0b0d] shadow-xs font-semibold" : "text-[#5b616e]"
            }`}
          >
            Daftar
          </button>
          <button
            onClick={() => setMobileTab("detail")}
            className={`px-2.5 py-1 rounded-[8px] font-medium transition-colors ${
              mobileTab === "detail" ? "bg-white text-[#0a0b0d] shadow-xs font-semibold" : "text-[#5b616e]"
            }`}
          >
            Editor
          </button>
        </div>
      </div>

      {/* Main 3-Column Studio Workspace */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Left Column: Sidebar */}
        <div
          className={`${
            mobileTab === "nav" ? "flex" : "hidden"
          } md:flex h-full shrink-0`}
        >
          <Sidebar
            categories={categories}
            notes={notes}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={handleSelectCategory}
            onOpenCreateNote={handleOpenCreateNote}
            onOpenCategoryModal={() => setIsCategoryModalOpen(true)}
          />
        </div>

        {/* Middle Column: Note List */}
        <div
          className={`${
            mobileTab === "list" ? "flex" : "hidden"
          } md:flex h-full shrink-0`}
        >
          <NoteList
            notes={notes}
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            selectedNoteId={selectedNoteId}
            onSelectNote={handleSelectNote}
            onOpenCreateNote={handleOpenCreateNote}
            onDeleteNote={handleDeleteNote}
            onClearCategoryFilter={() => setSelectedCategoryId(null)}
          />
        </div>

        {/* Right Column: Viewer or Editor */}
        <div
          className={`${
            mobileTab === "detail" ? "flex" : "hidden"
          } md:flex flex-1 h-full overflow-hidden`}
        >
          {editorMode === "create" ? (
            <NoteEditor
              note={null}
              categories={categories}
              defaultCategoryId={selectedCategoryId}
              onSave={handleSaveNote}
              onCancel={() => {
                setEditorMode("idle");
                setMobileTab("list");
              }}
              onOpenCategoryModal={() => setIsCategoryModalOpen(true)}
            />
          ) : editorMode === "edit" && selectedNote ? (
            <NoteEditor
              note={selectedNote}
              categories={categories}
              defaultCategoryId={selectedNote.category_id}
              onSave={handleSaveNote}
              onCancel={() => {
                setEditorMode("idle");
                setMobileTab("list");
              }}
              onOpenCategoryModal={() => setIsCategoryModalOpen(true)}
            />
          ) : (
            <NoteViewer
              note={selectedNote}
              onEdit={handleOpenEditNote}
              onDelete={handleDeleteNote}
              onOpenCreateNote={handleOpenCreateNote}
              onShowToast={showToast}
              onBackMobile={() => setMobileTab("list")}
            />
          )}
        </div>
      </main>

      {/* Category Manager Modal */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categories}
        onRefresh={loadData}
        onShowToast={showToast}
      />

      {/* Floating Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
