"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPurchase(formData: FormData) {
  const date = String(formData.get("date") || "");
  const item = String(formData.get("item") || "");
  const category = String(formData.get("category") || "");
  const qty = Number(formData.get("qty") || 0);
  const supplierRaw = String(formData.get("supplier") || "");
  const total = Number(formData.get("total") || 0);

  const supplier = supplierRaw.trim() ? supplierRaw.trim() : null;

  if (!date || !item || !category || qty <= 0 || total <= 0) {
    throw new Error("Field wajib belum diisi dengan benar.");
  }

  await prisma.purchase.create({
    data: {
      date: new Date(date),
      item,
      category,
      qty,
      supplier,
      total,
    },
  });

  revalidatePath("/pengeluaran-barang");
}

export async function deletePurchase(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) throw new Error("ID kosong.");

  await prisma.purchase.delete({
    where: { id },
  });

  revalidatePath("/pengeluaran-barang");
}
