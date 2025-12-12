"use client";

import { useState } from "react";

type Purchase = {
  date: string;
  item: string;
  category: string;
  qty: number;
  supplier: string;
  total: string;
};

const initialPurchases: Purchase[] = [
  {
    date: "11-12-2025",
    item: "Keju Mozzarella",
    category: "Bahan Baku",
    qty: 5,
    supplier: "Supplier A",
    total: "Rp 250.000",
  },
  {
    date: "11-12-2025",
    item: "Sosis",
    category: "Bahan Baku",
    qty: 10,
    supplier: "Supplier B",
    total: "Rp 150.000",
  },
];

export default function PengeluaranBarangPage() {
  const [purchases, setPurchases] = useState<Purchase[]>(initialPurchases);
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    date: "",
    item: "",
    category: "",
    qty: "",
    supplier: "",
    total: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.date || !form.item || !form.category || !form.qty || !form.total) {
      alert("Tanggal, Nama Barang, Kategori, Qty, dan Total wajib diisi.");
      return;
    }

    setPurchases((prev) => [
      {
        date: form.date,
        item: form.item,
        category: form.category,
        qty: Number(form.qty),
        supplier: form.supplier,
        total: form.total,
      },
      ...prev,
    ]);

    setForm({
      date: "",
      item: "",
      category: "",
      qty: "",
      supplier: "",
      total: "",
    });
    setIsOpen(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Pengeluaran Barang Dibeli</h1>
      <p className="text-slate-300 mb-6">
        Pantau semua pembelian stok dan bahan baku agar biaya produksi tetap
        terkontrol.
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span>Kategori:</span>
          <select className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm">
            <option>Semua</option>
            <option>Bahan Baku</option>
            <option>Perlengkapan</option>
          </select>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="ml-auto rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500"
        >
          + Tambah Pembelian Barang
        </button>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900 text-slate-300">
            <tr>
              <th className="px-4 py-2 text-left">Tanggal</th>
              <th className="px-4 py-2 text-left">Nama Barang</th>
              <th className="px-4 py-2 text-left">Kategori</th>
              <th className="px-4 py-2 text-right">Qty</th>
              <th className="px-4 py-2 text-left">Supplier</th>
              <th className="px-4 py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {purchases.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-900/60">
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">{item.item}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2 text-right">{item.qty}</td>
                <td className="px-4 py-2">{item.supplier}</td>
                <td className="px-4 py-2 text-right text-red-400">
                  {item.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal tambah pembelian */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/60"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-slate-950 border border-slate-800 p-5 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">
              Tambah Pembelian Barang
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
              <div>
                <label className="block mb-1 text-slate-300">Tanggal</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-300">
                  Nama Barang
                </label>
                <input
                  type="text"
                  name="item"
                  value={form.item}
                  onChange={handleChange}
                  placeholder="Misal: Keju Mozzarella"
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-300">Kategori</label>
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Misal: Bahan Baku"
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-300">Qty</label>
                  <input
                    type="number"
                    min={1}
                    name="qty"
                    value={form.qty}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-300">
                    Supplier (opsional)
                  </label>
                  <input
                    type="text"
                    name="supplier"
                    value={form.supplier}
                    onChange={handleChange}
                    placeholder="Misal: Supplier A"
                    className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-300">
                  Total (format bebas)
                </label>
                <input
                  type="text"
                  name="total"
                  value={form.total}
                  onChange={handleChange}
                  placeholder="Misal: Rp 250.000"
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
                />
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md border border-slate-700 px-3 py-2 text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-emerald-600 px-3 py-2 text-xs font-medium hover:bg-emerald-500"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
