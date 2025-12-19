import { prisma } from "@/lib/prisma";

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}
function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

type SummaryCardProps = {
  title: string;
  amount: string;
  highlight?: "income" | "expense" | "neutral";
};

function SummaryCard({
  title,
  amount,
  highlight = "neutral",
}: SummaryCardProps) {
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

export default async function DashboardPage() {
  // Ringkasan (aggregate)
  const [salesSum, employeeIncomeSum, purchaseSum, otherExpenseSum, salarySum] =
    await Promise.all([
      prisma.sale.aggregate({ _sum: { total: true } }),
      prisma.employeeIncome.aggregate({ _sum: { amount: true } }),
      prisma.purchase.aggregate({ _sum: { total: true } }),
      prisma.otherExpense.aggregate({ _sum: { amount: true } }),
      prisma.salaryPayment.aggregate({ _sum: { amount: true } }),
    ]);

  const totalPendapatan =
    (salesSum._sum.total ?? 0) + (employeeIncomeSum._sum.amount ?? 0);

  const totalPengeluaran =
    (purchaseSum._sum.total ?? 0) +
    (otherExpenseSum._sum.amount ?? 0) +
    (salarySum._sum.amount ?? 0);

  const labaRugi = totalPendapatan - totalPengeluaran;

  // “Transaksi terbaru”: gabungkan dari beberapa tabel (ambil 5 terbaru tiap tabel, lalu sort)
  const [latestSales, latestPurchases, latestOtherExpenses, latestSalary, latestEmpIncome] =
    await Promise.all([
      prisma.sale.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.purchase.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.otherExpense.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.salaryPayment.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.employeeIncome.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    ]);

  const latest = [
    ...latestSales.map((x) => ({
      at: x.createdAt,
      date: x.date,
      label: `Penjualan: ${x.item}`,
      amount: x.total,
      kind: "income" as const,
    })),
    ...latestEmpIncome.map((x) => ({
      at: x.createdAt,
      date: x.date,
      label: `Pendapatan Karyawan: ${x.employee} (${x.type})`,
      amount: x.amount,
      kind: "income" as const,
    })),
    ...latestPurchases.map((x) => ({
      at: x.createdAt,
      date: x.date,
      label: `Pengeluaran Barang: ${x.item}`,
      amount: x.total,
      kind: "expense" as const,
    })),
    ...latestOtherExpenses.map((x) => ({
      at: x.createdAt,
      date: x.date,
      label: `Biaya Lain-lain: ${x.type}`,
      amount: x.amount,
      kind: "expense" as const,
    })),
    ...latestSalary.map((x) => ({
      at: x.createdAt,
      date: x.date,
      label: `Gaji Dibayar: ${x.employee}`,
      amount: x.amount,
      kind: "expense" as const,
    })),
  ]
    .sort((a, b) => b.at.getTime() - a.at.getTime())
    .slice(0, 10);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-slate-300 mb-6">
        Ringkasan cepat berdasarkan data yang tersimpan di database.
      </p>

      <section className="grid gap-4 md:grid-cols-3 mb-8">
        <SummaryCard
          title="Total Pendapatan"
          amount={formatRupiah(totalPendapatan)}
          highlight="income"
        />
        <SummaryCard
          title="Total Pengeluaran"
          amount={formatRupiah(totalPengeluaran)}
          highlight="expense"
        />
        <SummaryCard
          title="Laba / Rugi"
          amount={(labaRugi < 0 ? "- " : "") + formatRupiah(Math.abs(labaRugi))}
          highlight={labaRugi < 0 ? "expense" : "income"}
        />
      </section>

      <section className="rounded-xl bg-slate-900/60 border border-slate-800 p-4">
        <h2 className="text-lg font-semibold mb-3">Transaksi Terbaru</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-slate-300">
              <tr>
                <th className="px-3 py-2 text-left">Tanggal</th>
                <th className="px-3 py-2 text-left">Keterangan</th>
                <th className="px-3 py-2 text-right">Nominal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {latest.map((t, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60">
                  <td className="px-3 py-2">{isoDate(t.date)}</td>
                  <td className="px-3 py-2">{t.label}</td>
                  <td
                    className={`px-3 py-2 text-right ${
                      t.kind === "income" ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {formatRupiah(t.amount)}
                  </td>
                </tr>
              ))}

              {latest.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-3 py-6 text-center text-slate-400">
                    Belum ada transaksi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
