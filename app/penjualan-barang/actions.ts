"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSale(formData: FormData) {
  const date = String(formData.get("date") || "");
  const item = String(formData.get("item") || "");
  const category = String(formData.get("category") || "");
  const qty = Number(formData.get("qty") || 0);

  const priceRaw = String(formData.get("price") || "");
  const customerRaw = String(formData.get("customer") || "");
  const total = Number(formData.get("total") || 0);

  const price = priceRaw.trim() ? Number(priceRaw) : null;
  const customer = customerRaw.trim() ? customerRaw.trim() : null;

  if (!date || !item || !category || qty <= 0 || total <= 0) {
    throw new Error("Tanggal, Nama Barang, Kategori, Qty, dan Total wajib diisi.");
  }

  if (price !== null && Number.isNaN(price)) {
    throw new Error("Harga tidak valid.");
  }

  await prisma.sale.create({
    data: {
      date: new Date(date),
      item,
      category,
      qty,
      price,
      customer,
      total,
    },
  });

  revalidatePath("/penjualan-barang");
}

export async function deleteSale(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) throw new Error("ID kosong.");

  await prisma.sale.delete({
    where: { id },
  });

  revalidatePath("/penjualan-barang");
}
