"use client";

import { useState } from "react";

type Salary = {
  date: string;
  employee: string;
  period: string;
  note: string;
  amount: string;
};

const initialSalaries: Salary[] = [
  {
    date: "11-12-2025",
    employee: "Budi",
    period: "Desember 2025",
    note: "Gaji pokok + lembur",
    amount: "Rp 3.000.000",
  },
];

export default function GajiDibayarPage() {
  const [salaries, setSalaries] = useState<Salary[]>(initialSalaries);
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    date: "",
    employee: "",
    period: "",
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

    if (!form.date || !form.employee || !form.period || !form.amount) {
      alert("Tanggal, Karyawan, Periode, dan Nominal wajib diisi.");
      return;
    }

    setSalaries((prev) => [
      {
        date: form.date,
        employee: form.employee,
        period: form.period,
        note: form.note,
        amount: form.amount,
      },
      ...prev,
    ]);

    setForm({ date: "", employee: "", period: "", note: "", amount: "" });
    setIsOpen(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Gaji yang Telah Dibayar</h1>
      <p className="text-slate-300 mb-6">
        Catat semua pembayaran gaji karyawan per periode untuk memantau beban
        biaya tenaga kerja.
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span>Periode:</span>
          <select className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm">
            <option>Desember 2025</option>
            <option>November 2025</option>
          </select>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="ml-auto rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500"
        >
          + Tambah Pembayaran Gaji
        </button>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900 text-slate-300">
            <tr>
              <th className="px-4 py-2 text-left">Tanggal Bayar</th>
              <th className="px-4 py-2 text-left">Karyawan</th>
              <th className="px-4 py-2 text-left">Periode</th>
              <th className="px-4 py-2 text-left">Keterangan</th>
              <th className="px-4 py-2 text-right">Nominal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {salaries.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-900/60">
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">{item.employee}</td>
                <td className="px-4 py-2">{item.period}</td>
                <td className="px-4 py-2">{item.note}</td>
                <td className="px-4 py-2 text-right text-red-400">
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal sederhana */}
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
              Tambah Pembayaran Gaji
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
              <div>
                <label className="block mb-1 text-slate-300">
                  Tanggal Bayar
                </label>
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
                  Nama Karyawan
                </label>
                <input
                  type="text"
                  name="employee"
                  value={form.employee}
                  onChange={handleChange}
                  placeholder="Misal: Budi"
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-300">
                  Periode Gaji
                </label>
                <input
                  type="text"
                  name="period"
                  value={form.period}
                  onChange={handleChange}
                  placeholder="Misal: Desember 2025"
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-300">Nominal</label>
                <input
                  type="text"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="Misal: Rp 3.000.000"
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
