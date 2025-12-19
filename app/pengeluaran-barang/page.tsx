import { prisma } from "@/lib/prisma";
import { createPurchase, deletePurchase } from "./actions";

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default async function PengeluaranBarangPage() {
  const purchases = await prisma.purchase.findMany({
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Pengeluaran Barang Dibeli</h1>
      <p className="text-slate-300 mb-6">
        Data tersimpan di SQLite (Prisma) dan bisa ditambah/hapus via Server
        Actions.
      </p>

      {/* CREATE */}
      <form
        action={createPurchase}
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
            placeholder="Nama barang"
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-300">Kategori</label>
          <input
            name="category"
            required
            placeholder="Kategori"
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
            placeholder="Qty"
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-300">
            Supplier (opsional)
          </label>
          <input
            name="supplier"
            placeholder="Supplier"
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-300">
            Total (angka, contoh 250000)
          </label>
          <input
            name="total"
            type="number"
            min={0}
            required
            placeholder="Total"
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
              <th className="px-4 py-2 text-left">Nama Barang</th>
              <th className="px-4 py-2 text-left">Kategori</th>
              <th className="px-4 py-2 text-right">Qty</th>
              <th className="px-4 py-2 text-left">Supplier</th>
              <th className="px-4 py-2 text-right">Total</th>
              <th className="px-4 py-2 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {purchases.map((p) => (
              <tr key={p.id} className="hover:bg-slate-900/60">
                <td className="px-4 py-2">{isoDate(p.date)}</td>
                <td className="px-4 py-2">{p.item}</td>
                <td className="px-4 py-2">{p.category}</td>
                <td className="px-4 py-2 text-right">{p.qty}</td>
                <td className="px-4 py-2">{p.supplier ?? "-"}</td>
                <td className="px-4 py-2 text-right text-red-400">
                  {formatRupiah(p.total)}
                </td>
                <td className="px-4 py-2 text-right">
                  <form action={deletePurchase}>
                    <input type="hidden" name="id" value={p.id} />
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

            {purchases.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-4 text-center text-slate-400"
                >
                  Belum ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
