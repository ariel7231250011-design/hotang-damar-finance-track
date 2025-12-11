export default function PendapatanKaryawanPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pendapatan Karyawan</h1>
      <p className="text-slate-300 mb-4">
        Halaman ini nanti digunakan untuk mencatat pendapatan tambahan karyawan
        seperti bonus, komisi, atau insentif.
      </p>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Data Pendapatan (Dummy)</h2>
        <button className="rounded bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500">
          + Tambah Pendapatan
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900 text-slate-300">
            <tr>
              <th className="px-4 py-2 text-left">Tanggal</th>
              <th className="px-4 py-2 text-left">Karyawan</th>
              <th className="px-4 py-2 text-left">Jenis</th>
              <th className="px-4 py-2 text-right">Nominal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            <tr>
              <td className="px-4 py-2">11-12-2025</td>
              <td className="px-4 py-2">Budi</td>
              <td className="px-4 py-2">Bonus</td>
              <td className="px-4 py-2 text-right text-emerald-400">
                Rp 200.000
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
