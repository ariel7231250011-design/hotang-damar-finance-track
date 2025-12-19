import { prisma } from "@/lib/prisma";

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
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

export default async function LaporanPage() {
  // SUM pendapatan
  const salesSum = await prisma.sale.aggregate({
    _sum: { total: true },
  });
  const employeeIncomeSum = await prisma.employeeIncome.aggregate({
    _sum: { amount: true },
  });

  // SUM pengeluaran
  const purchaseSum = await prisma.purchase.aggregate({
    _sum: { total: true },
  });
  const otherExpenseSum = await prisma.otherExpense.aggregate({
    _sum: { amount: true },
  });
  const salaryPaymentSum = await prisma.salaryPayment.aggregate({
    _sum: { amount: true },
  });

  const totalPendapatan =
    (salesSum._sum.total ?? 0) + (employeeIncomeSum._sum.amount ?? 0);

  const totalPengeluaran =
    (purchaseSum._sum.total ?? 0) +
    (otherExpenseSum._sum.amount ?? 0) +
    (salaryPaymentSum._sum.amount ?? 0);

  const labaRugi = totalPendapatan - totalPengeluaran;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Laporan Keuangan</h1>
      <p className="text-slate-300 mb-6">
        Ringkasan pendapatan, pengeluaran, dan laba/rugi berdasarkan data yang tersimpan.
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

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4">
          <h2 className="text-lg font-semibold mb-3">Pendapatan</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Penjualan Barang</span>
              <span className="text-emerald-400">
                {formatRupiah(salesSum._sum.total ?? 0)}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Pendapatan Karyawan</span>
              <span className="text-emerald-400">
                {formatRupiah(employeeIncomeSum._sum.amount ?? 0)}
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4">
          <h2 className="text-lg font-semibold mb-3">Pengeluaran</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Gaji Dibayar</span>
              <span className="text-red-400">
                {formatRupiah(salaryPaymentSum._sum.amount ?? 0)}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Pengeluaran Barang</span>
              <span className="text-red-400">
                {formatRupiah(purchaseSum._sum.total ?? 0)}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Biaya Lain-lain</span>
              <span className="text-red-400">
                {formatRupiah(otherExpenseSum._sum.amount ?? 0)}
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
