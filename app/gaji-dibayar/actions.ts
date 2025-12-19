"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSalaryPayment(formData: FormData) {
  const date = String(formData.get("date") || "");
  const employee = String(formData.get("employee") || "");
  const noteRaw = String(formData.get("note") || "");
  const amount = Number(formData.get("amount") || 0);

  const note = noteRaw.trim() ? noteRaw.trim() : null;

  if (!date || !employee || amount <= 0) {
    throw new Error("Tanggal, Nama Karyawan, dan Nominal wajib diisi.");
  }

  await prisma.salaryPayment.create({
    data: {
      date: new Date(date),
      employee,
      note,
      amount,
    },
  });

  revalidatePath("/gaji-dibayar");
}

export async function deleteSalaryPayment(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) throw new Error("ID kosong.");

  await prisma.salaryPayment.delete({
    where: { id },
  });

  revalidatePath("/gaji-dibayar");
}
