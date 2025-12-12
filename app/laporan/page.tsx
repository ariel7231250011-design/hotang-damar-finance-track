export default function LaporanPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Laporan Keuangan</h1>
      <p className="text-slate-300 mb-6">
        Ringkasan pendapatan, pengeluaran, dan laba/rugi untuk membantu evaluasi usaha.
      </p>

      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <span className="text-sm text-slate-300">Periode:</span>
        <select className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm">
          <option>Bulan ini</option>
          <option>Bulan lalu</option>
          <option>Tahun ini</option>
        </select>
      </div>

      <section className="grid gap-4 md:grid-cols-3 mb-8">
        <SummaryCard title="Total Pendapatan" amount="Rp 150.000" highlight="income" />
        <SummaryCard title="Total Pengeluaran" amount="Rp 900.000" highlight="expense" />
        <SummaryCard title="Laba / Rugi" amount="- Rp 750.000" highlight="expense" />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4">
          <h2 className="text-lg font-semibold mb-3">Pendapatan</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Penjualan Barang</span>
              <span className="text-emerald-400">Rp 150.000</span>
            </li>
            <li className="flex justify-between">
              <span>Pendapatan Karyawan</span>
              <span className="text-emerald-400">Rp 0</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4">
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
