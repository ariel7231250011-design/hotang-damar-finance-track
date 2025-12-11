export default function LaporanPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Laporan Keuangan Sederhana</h1>
      <p className="text-slate-300 mb-6">
        Halaman ini menampilkan ringkasan total pendapatan, pengeluaran, dan
        laba/rugi pada periode tertentu.
      </p>

      {/* Filter periode sederhana (belum berfungsi) */}
      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <span className="text-sm text-slate-300">Periode:</span>
        <select className="rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm">
          <option>Bulan ini</option>
          <option>Bulan lalu</option>
          <option>Tahun ini</option>
        </select>
      </div>

      {/* Ringkasan utama */}
      <section className="grid gap-4 md:grid-cols-3 mb-8">
        <div className="rounded-lg bg-slate-900 border border-slate-800 p-4">
          <p className="text-sm text-slate-400">Total Pendapatan</p>
          <p className="text-2xl font-semibold mt-2 text-emerald-400">
            Rp 150.000
          </p>
        </div>
        <div className="rounded-lg bg-slate-900 border border-slate-800 p-4">
          <p className="text-sm text-slate-400">Total Pengeluaran</p>
          <p className="text-2xl font-semibold mt-2 text-red-400">
            Rp 900.000
          </p>
        </div>
        <div className="rounded-lg bg-slate-900 border border-slate-800 p-4">
          <p className="text-sm text-slate-400">Laba / Rugi</p>
          <p className="text-2xl font-semibold mt-2 text-red-400">
            - Rp 750.000
          </p>
        </div>
      </section>

      {/* Breakdown sederhana */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-slate-900 border border-slate-800 p-4">
          <h2 className="text-lg font-semibold mb-3">Pendapatan</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Pendapatan Penjualan</span>
              <span className="text-emerald-400">Rp 150.000</span>
            </li>
            <li className="flex justify-between">
              <span>Pendapatan Karyawan</span>
              <span className="text-emerald-400">Rp 0</span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg bg-slate-900 border border-slate-800 p-4">
          <h2 className="text-lg font-semibold mb-3">Pengeluaran</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Gaji Dibayar</span>
              <span className="text-red-400">Rp 500.000</span>
            </li>
            <li className="flex justify-between">
              <span>Pengeluaran Barang</span>
              <span className="text-red-400">Rp 100.000</span>
            </li>
            <li className="flex justify-between">
              <span>Biaya Lain-lain</span>
              <span className="text-red-400">Rp 300.000</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
