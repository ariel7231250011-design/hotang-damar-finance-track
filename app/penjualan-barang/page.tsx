import { prisma } from "@/lib/prisma";
import { createSale, deleteSale } from "./actions";

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default async function PenjualanBarangPage() {
  const sales = await prisma.sale.findMany({
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Penjualan Barang</h1>
      <p className="text-slate-300 mb-6">
        Catat transaksi penjualan agar pendapatan dapat dipantau (tersimpan di DB).
      </p>

      {/* CREATE */}
      <form
        action={createSale}
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
          <label className="block mb-1 text-slate-300">Nama Barang</label>
          <input
            name="item"
            required
            placeholder="Contoh: Hotang Mozzarella"
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-300">Kategori</label>
          <input
            name="category"
            required
            placeholder="Contoh: Menu Utama"
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-300">Qty</label>
          <input
            name="qty"
            type="number"
            min={1}
            required
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-300">
            Harga/Unit (opsional, angka)
          </label>
          <input
            name="price"
            type="number"
            min={0}
            placeholder="Contoh: 15000"
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-300">
            Pelanggan/Channel (opsional)
          </label>
          <input
            name="customer"
            placeholder="Contoh: Walk-in / GoFood"
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
          />
        </div>

        <div className="md:col-span-3">
          <label className="block mb-1 text-slate-300">
            Total (angka, contoh 150000)
          </label>
          <input
            name="total"
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
              <th className="px-4 py-2 text-left">Barang</th>
              <th className="px-4 py-2 text-left">Kategori</th>
              <th className="px-4 py-2 text-right">Qty</th>
              <th className="px-4 py-2 text-right">Harga/Unit</th>
              <th className="px-4 py-2 text-left">Pelanggan</th>
              <th className="px-4 py-2 text-right">Total</th>
              <th className="px-4 py-2 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {sales.map((s) => (
              <tr key={s.id} className="hover:bg-slate-900/60">
                <td className="px-4 py-2">{isoDate(s.date)}</td>
                <td className="px-4 py-2">{s.item}</td>
                <td className="px-4 py-2">{s.category}</td>
                <td className="px-4 py-2 text-right">{s.qty}</td>
                <td className="px-4 py-2 text-right">
                  {s.price === null ? "-" : formatRupiah(s.price)}
                </td>
                <td className="px-4 py-2">{s.customer ?? "-"}</td>
                <td className="px-4 py-2 text-right text-emerald-400">
                  {formatRupiah(s.total)}
                </td>
                <td className="px-4 py-2 text-right">
                  <form action={deleteSale}>
                    <input type="hidden" name="id" value={s.id} />
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

            {sales.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-center text-slate-400">
                  Belum ada data penjualan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
