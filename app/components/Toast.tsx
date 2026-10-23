"use client";

import { CheckCircle2, AlertCircle, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error";
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function ToastContainer({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-[12px] border shadow-xl backdrop-blur-md transition-all animate-in slide-in-from-bottom-2 ${
            t.type === "success"
              ? "bg-white border-[#047a4a]/40 text-[#047a4a]"
              : "bg-white border-[#c0202d]/40 text-[#c0202d]"
          }`}
        >
          <div className="flex items-center gap-2.5 text-xs font-semibold">
            {t.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-[#047a4a] shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-[#c0202d] shrink-0" />
            )}
            <span className="text-[#0a0b0d]">{t.message}</span>
          </div>
          <button
            onClick={() => onDismiss(t.id)}
            className="p-1 text-[#6a707a] hover:text-[#0a0b0d] transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
