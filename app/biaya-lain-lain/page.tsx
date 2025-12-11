export default function BiayaLainLainPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Biaya Lain-lain</h1>
      <p className="text-slate-300 mb-4">
        Halaman ini digunakan untuk mencatat biaya operasional lain seperti
        listrik, internet, sewa, transport, dan sebagainya.
      </p>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Data Biaya (Dummy)</h2>
        <button className="rounded bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500">
          + Tambah Biaya
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-800">
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
            <tr>
              <td className="px-4 py-2">11-12-2025</td>
              <td className="px-4 py-2">Listrik</td>
              <td className="px-4 py-2">Token listrik bulanan</td>
              <td className="px-4 py-2 text-right text-red-400">
                Rp 300.000
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">11-12-2025</td>
              <td className="px-4 py-2">Internet</td>
              <td className="px-4 py-2">Tagihan wi-fi</td>
              <td className="px-4 py-2 text-right text-red-400">
                Rp 250.000
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
