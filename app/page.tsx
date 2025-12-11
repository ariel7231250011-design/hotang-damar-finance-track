export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Judul aplikasi */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Hotang Damar Finance Track
          </h1>
          <p className="text-slate-300">
            Prototype dashboard keuangan untuk mencatat pendapatan, gaji, pengeluaran,
            dan biaya lain-lain.
          </p>
        </header>

        {/* Kartu ringkasan */}
        <section className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="rounded-lg bg-slate-900 border border-slate-800 p-4">
            <p className="text-sm text-slate-400">Total Pendapatan Karyawan</p>
            <p className="text-2xl font-semibold mt-2">Rp 0</p>
          </div>

          <div className="rounded-lg bg-slate-900 border border-slate-800 p-4">
            <p className="text-sm text-slate-400">Total Gaji Dibayar</p>
            <p className="text-2xl font-semibold mt-2">Rp 0</p>
          </div>

          <div className="rounded-lg bg-slate-900 border border-slate-800 p-4">
            <p className="text-sm text-slate-400">Total Pengeluaran Barang</p>
            <p className="text-2xl font-semibold mt-2">Rp 0</p>
          </div>
        </section>

        {/* Tabel transaksi terbaru (dummy) */}
        <section>
          <h2 className="text-xl font-semibold mb-4">
            Transaksi Terbaru
          </h2>

          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-900 text-slate-300">
                <tr>
                  <th className="px-4 py-2 text-left">Tanggal</th>
                  <th className="px-4 py-2 text-left">Jenis</th>
                  <th className="px-4 py-2 text-left">Deskripsi</th>
                  <th className="px-4 py-2 text-right">Nominal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="px-4 py-2">11-12-2025</td>
                  <td className="px-4 py-2">Penjualan Barang</td>
                  <td className="px-4 py-2">Penjualan contoh</td>
                  <td className="px-4 py-2 text-right text-emerald-400">
                    + Rp 150.000
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">11-12-2025</td>
                  <td className="px-4 py-2">Pengeluaran Barang</td>
                  <td className="px-4 py-2">Pembelian stok contoh</td>
                  <td className="px-4 py-2 text-right text-red-400">
                    - Rp 50.000
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">11-12-2025</td>
                  <td className="px-4 py-2">Gaji Dibayar</td>
                  <td className="px-4 py-2">Gaji karyawan contoh</td>
                  <td className="px-4 py-2 text-right text-red-400">
                    - Rp 500.000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
