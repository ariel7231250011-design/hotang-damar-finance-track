type SummaryCardProps = {
  title: string;
  amount: string;
  highlight?: "income" | "expense" | "neutral";
};

function SummaryCard({ title, amount, highlight = "neutral" }: SummaryCardProps) {
  const color =
    highlight === "income"
      ? "text-emerald-400"
      : highlight === "expense"
      ? "text-red-400"
      : "text-slate-50";

  return (
    <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {title}
      </p>
      <p className={`mt-3 text-2xl font-semibold ${color}`}>{amount}</p>
    </div>
  );
}

const recentTransactions = [
  {
    date: "11-12-2025",
    type: "Penjualan Barang",
    desc: "Penjualan paket hotang",
    amount: "+ Rp 150.000",
    positive: true,
  },
  {
    date: "11-12-2025",
    type: "Pengeluaran Barang",
    desc: "Pembelian stok keju",
    amount: "- Rp 50.000",
    positive: false,
  },
  {
    date: "11-12-2025",
    type: "Gaji Dibayar",
    desc: "Gaji karyawan shift malam",
    amount: "- Rp 500.000",
    positive: false,
  },
];

export default function Home() {
  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Hotang Damar Finance Track
        </h1>
        <p className="text-slate-300">
          Pantau pendapatan, gaji, pengeluaran, dan biaya lain-lain dalam satu
          dashboard sederhana.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3 mb-10">
        <SummaryCard title="Total Pendapatan Karyawan" amount="Rp 0" />
        <SummaryCard title="Total Gaji Dibayar" amount="Rp 550.000" highlight="expense" />
        <SummaryCard
          title="Total Pengeluaran Barang"
          amount="Rp 50.000"
          highlight="expense"
        />
        <SummaryCard
          title="Total Pendapatan Penjualan"
          amount="Rp 150.000"
          highlight="income"
        />
        <SummaryCard title="Total Biaya Lain-lain" amount="Rp 300.000" highlight="expense" />
        <SummaryCard title="Laba / Rugi Sementara" amount="- Rp 750.000" highlight="expense" />
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Transaksi Terbaru</h2>
          <button className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs text-slate-200 hover:border-emerald-500">
            Lihat semua laporan
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
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
              {recentTransactions.map((tx, i) => (
                <tr key={i} className="hover:bg-slate-900/60">
                  <td className="px-4 py-2">{tx.date}</td>
                  <td className="px-4 py-2">{tx.type}</td>
                  <td className="px-4 py-2">{tx.desc}</td>
                  <td
                    className={`px-4 py-2 text-right ${
                      tx.positive ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {tx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
