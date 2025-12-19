"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOtherExpense(formData: FormData) {
  const date = String(formData.get("date") || "");
  const type = String(formData.get("type") || "");
  const noteRaw = String(formData.get("note") || "");
  const amount = Number(formData.get("amount") || 0);

  const note = noteRaw.trim() ? noteRaw.trim() : null;

  if (!date || !type || amount <= 0) {
    throw new Error("Tanggal, Jenis biaya, dan Nominal wajib diisi.");
  }

  await prisma.otherExpense.create({
    data: {
      date: new Date(date),
      type,
      note,
      amount,
    },
  });

  revalidatePath("/biaya-lain-lain");
}

export async function deleteOtherExpense(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) throw new Error("ID kosong.");

  await prisma.otherExpense.delete({
    where: { id },
  });

  revalidatePath("/biaya-lain-lain");
}
