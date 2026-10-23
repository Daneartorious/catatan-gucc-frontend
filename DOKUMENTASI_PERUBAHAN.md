# 📘 Dokumentasi Perubahan & Refactoring Frontend
**Proyek:** `Catatan Workspace (catatan-frontend)`  
**Tanggal:** 14 Oktober 2026 (Sesi Malam)  
**Lead Reviewer & Engineer:** Anya (Principal AI Senior Engineer)  
**User:** Dane  
**Status Build:** ✅ Production Build Passed (Turbopack, Zero TS Errors)

---

## 📌 Ringkasan Eksekutif

Malam ini telah dilakukan audit multi-dimensi menggunakan framework *5-Axis Review* (`code-review-and-quality`) dan implementasi standar UI profesional (`frontend-ui-engineering`). Semua skills global yang dimasukkan ke sistem terdeteksi dan aktif secara penuh.

Seluruh refactoring berfokus pada 5 pilar utama:
1. **Safety & Data Protection:** Mencegah penghapusan catatan tidak sengaja akibat misclick.
2. **Design System & Radius Consistency:** Menghilangkan ketidakkonsistenan warna dan merapikan sistem rounded corner menjadi 3 tingkat berjenjang.
3. **Data Integrity (Uncategorized Notes):** Membuka batasan form agar mendukung catatan tanpa kategori (`category_id: null`).
4. **Reading Experience & Feature Utilization:** Menampilkan estimasi waktu baca, jumlah kata, dan karakter serta melembutkan visual pemisah konten.
5. **Mobile Navigation Ergonomics:** Menambahkan navigasi kembali (back button) yang ramah ibu jari pada viewport smartphone.

---

## 🛠️ Rincian Perubahan per Berkas

### 1. `app/components/NoteList.tsx`
* **Fitur Baru (Safety Guard):**
  - Menambahkan state `deletingNoteId: number | null`.
  - Mengubah aksi tombol tong sampah menjadi konfirmasi 2 langkah inline (`Hapus? [Ya] [Batal]`). Data di PostgreSQL tidak akan terhapus kecuali user menekan konfirmasi `Ya`.
* **Desain & Tipografi:**
  - Standardisasi border radius card catatan menjadi `rounded-[14px]`.
  - Standardisasi kotak input pencarian menjadi `rounded-[10px]`.
  - Memanfaatkan fungsi `calculateReadTime` di bagian bawah setiap kartu catatan lengkap dengan ikon jam kecil.
  - Memperbaiki padding tombol konfirmasi menjadi `py-0.5`.

### 2. `app/components/CategoryModal.tsx`
* **Kepatuhan Palet Warna:**
  - Menghapus kelas warna bawaan Tailwind `hover:bg-slate-100` dan `bg-slate-200`.
  - Menggantinya dengan token netral hangat (`#f5f7fa`, `#dee1e6`, `#eef0f3`) sesuai dengan spesifikasi `Catatan Color Pallete.md`.
* **Standardisasi Radius:**
  - Mengubah radius modal container menjadi `rounded-[14px]`.
  - Mengubah radius input dan tombol tambah menjadi `rounded-[10px]`.

### 3. `types/index.ts`
* **Pembaruan Interface:**
  - Mengubah field `category_id` pada `CreateNotePayload` dan `UpdateNotePayload` dari `number` menjadi `number | null`.
  - Memastikan sinkronisasi tipe data frontend selaras dengan skema database backend yang memperbolehkan foreign key kategori bernilai null.

### 4. `app/components/NoteEditor.tsx`
* **Dukungan Catatan Tanpa Kategori:**
  - Menghilangkan validasi blokir `if (categoryId === "" || Number(categoryId) <= 0)`.
  - Menambahkan opsi pertama pada dropdown kategori: `<option value="">— Tanpa Kategori —</option>`.
  - Mengirim `category_id: null` jika user memilih tanpa kategori.
* **Ergonomi Mobile:**
  - Menambahkan tombol panah kembali (`< ArrowLeft`) di pojok kiri toolbar editor khusus mobile (`md:hidden`).
  - Mengklik tombol ini otomatis membatalkan edit dan mengembalikan viewport ke tab daftar catatan.
* **Standardisasi Radius:**
  - Mengubah radius input, select, dan container form menjadi seragam (`rounded-[10px]`).

### 5. `app/components/NoteViewer.tsx`
* **Peningkatan Kenyamanan Membaca:**
  - Mengintegrasikan fungsi `calculateReadTime(note.content)` di sub-header viewer.
  - Menampilkan metadata komprehensif: Waktu baca • Jumlah kata • Jumlah karakter • ID Catatan.
  - Mengganti garis pemisah statis tebal menjadi garis lembut `bg-[#dee1e6]/80` dengan spasi bernapas.
* **Ergonomi Mobile:**
  - Menambahkan tombol panah kembali (`< ArrowLeft`) di pojok kiri toolbar viewer khusus mobile (`md:hidden`).
  - Mengklik tombol ini memindahkan tampilan langsung ke daftar catatan.

### 6. `app/page.tsx`
* **Eliminasi Race Condition & Double Fetch:**
  - Memperbaiki `handleSaveNote` dengan menambahkan `await loadData()` agar state jaringan dan state lokal tidak saling tumpang-tindih.
  - Membuang ketergantungan `selectedNoteId` di dalam hook `useCallback` untuk `loadData` dengan memanfaatkan *functional state updater* `setSelectedNoteId((prev) => ...)`. Hal ini mencegah re-kreasi fungsi yang tidak perlu pada setiap klik catatan.
* **Koneksi Navigasi Mobile:**
  - Meneruskan prop `onBackMobile={() => setMobileTab("list")}` ke `NoteViewer`.
  - Menyesuaikan `onCancel` di `NoteEditor` agar otomatis memindahkan tab mobile kembali ke `"list"`.

### 7. Pembersihan Dead Code
* **Berkas Dihapus:**
  - Menghapus berkas `app/components/NoteCard.tsx` yang merupakan sisa prototyping lama dan tidak pernah diimpor dalam aplikasi.

---

## 📊 Hasil Pengujian & Verifikasi

| Uji Kelayakan | Perintah | Status | Keterangan |
|---|---|---|---|
| **Type Checking** | `npx tsc --noEmit` | ✅ Pass | 0 error, tipe data aman 100%. |
| **Production Build** | `npx next build` | ✅ Pass | Turbopack selesai dalam 6.2s, 8/8 rute statis ter-generate sempurna. |
| **Lint & Formatting** | Code Inspection | ✅ Pass | Tidak ada variabel tak terpakai atau arbitrary class invalid. |

---

## 💡 Panduan Menjalankan Proyek

1. **Jalankan Backend Go:**
   ```bash
   cd C:\STUDY\GOGO\Catatan
   go run main.go
   ```
2. **Jalankan Frontend Next.js:**
   ```bash
   cd C:\STUDY\GOGO\catatan-frontend
   npm run dev
   ```
3. Buka browser di `http://localhost:3000`.
