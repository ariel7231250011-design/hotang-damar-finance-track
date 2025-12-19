import { prisma } from "@/lib/prisma";
import { createEmployeeIncome, deleteEmployeeIncome } from "./actions";

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default async function PendapatanKaryawanPage() {
  const incomes = await prisma.employeeIncome.findMany({
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Pendapatan Karyawan</h1>
      <p className="text-slate-300 mb-6">
        Catat bonus, komisi, dan insentif karyawan (tersimpan di database).
      </p>

      {/* CREATE */}
      <form
        action={createEmployeeIncome}
        className="mb-6 grid gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm md:grid-cols-3"
      >
        <div>
          <label className="block mb-1 text-slate-300">Tanggal</label>
          <input
            name="date"
            type="date"
            required
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-300">Nama Karyawan</label>
          <input
            name="employee"
            required
            placeholder="Contoh: Budi"
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-300">Jenis</label>
          <input
            name="type"
            required
            placeholder="Bonus / Komisi / Insentif"
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-slate-300">
            Keterangan (opsional)
          </label>
          <input
            name="note"
            placeholder="Contoh: Bonus target"
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-300">
            Nominal (angka, contoh 150000)
          </label>
          <input
            name="amount"
            type="number"
            min={0}
            required
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
          />
        </div>

        <div className="md:col-span-3 flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500"
          >
            Simpan
          </button>
        </div>
      </form>

      {/* LIST + DELETE */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900 text-slate-300">
            <tr>
              <th className="px-4 py-2 text-left">Tanggal</th>
              <th className="px-4 py-2 text-left">Karyawan</th>
              <th className="px-4 py-2 text-left">Jenis</th>
              <th className="px-4 py-2 text-left">Keterangan</th>
              <th className="px-4 py-2 text-right">Nominal</th>
              <th className="px-4 py-2 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {incomes.map((x) => (
              <tr key={x.id} className="hover:bg-slate-900/60">
                <td className="px-4 py-2">{isoDate(x.date)}</td>
                <td className="px-4 py-2">{x.employee}</td>
                <td className="px-4 py-2">{x.type}</td>
                <td className="px-4 py-2">{x.note ?? "-"}</td>
                <td className="px-4 py-2 text-right text-emerald-400">
                  {formatRupiah(x.amount)}
                </td>
                <td className="px-4 py-2 text-right">
                  <form action={deleteEmployeeIncome}>
                    <input type="hidden" name="id" value={x.id} />
                    <button
                      type="submit"
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Hapus
                    </button>
                  </form>
                </td>
              </tr>
            ))}

            {incomes.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-4 text-center text-slate-400"
                >
                  Belum ada data pendapatan karyawan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
