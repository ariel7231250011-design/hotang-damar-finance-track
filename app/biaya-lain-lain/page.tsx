"use client";

import { useState } from "react";

type OtherExpense = {
  date: string;
  type: string;
  note: string;
  amount: string;
};

const initialExpenses: OtherExpense[] = [
  {
    date: "11-12-2025",
    type: "Listrik",
    note: "Token listrik outlet utama",
    amount: "Rp 300.000",
  },
  {
    date: "11-12-2025",
    type: "Internet",
    note: "Paket Wi-Fi bulanan",
    amount: "Rp 250.000",
  },
];

export default function BiayaLainLainPage() {
  const [expenses, setExpenses] = useState<OtherExpense[]>(initialExpenses);
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    date: "",
    type: "",
    note: "",
    amount: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.date || !form.type || !form.amount) {
      alert("Tanggal, Jenis Biaya, dan Nominal wajib diisi.");
      return;
    }

    setExpenses((prev) => [
      {
        date: form.date,
        type: form.type,
        note: form.note,
        amount: form.amount,
      },
      ...prev,
    ]);

    setForm({ date: "", type: "", note: "", amount: "" });
    setIsOpen(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Biaya Lain-lain</h1>
      <p className="text-slate-300 mb-6">
        Catat semua biaya operasional yang tidak termasuk gaji dan pembelian
        barang.
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span>Jenis:</span>
          <select className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm">
            <option>Semua</option>
            <option>Listrik</option>
            <option>Internet</option>
            <option>Sewa</option>
          </select>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="ml-auto rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500"
        >
          + Tambah Biaya
        </button>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900 text-slate-300">
            <tr>
              <th className="px-4 py-2 text-left">Tanggal</th>
              <th className="px-4 py-2 text-left">Jenis Biaya</th>
              <th className="px-4 py-2 text-left">Keterangan</th>
              <th className="px-4 py-2 text-right">Nominal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {expenses.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-900/60">
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">{item.type}</td>
                <td className="px-4 py-2">{item.note}</td>
                <td className="px-4 py-2 text-right text-red-400">
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal tambah biaya */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/60"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-slate-950 border border-slate-800 p-5 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Tambah Biaya Lain-lain</h2>

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
                <label className="block mb-1 text-slate-300">Jenis Biaya</label>
                <input
                  type="text"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  placeholder="Misal: Listrik, Internet"
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-300">
                  Nominal (format bebas)
                </label>
                <input
                  type="text"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="Misal: Rp 300.000"
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-300">
                  Keterangan (opsional)
                </label>
                <textarea
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  rows={2}
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
