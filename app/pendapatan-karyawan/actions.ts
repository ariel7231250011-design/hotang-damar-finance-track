"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createEmployeeIncome(formData: FormData) {
  const date = String(formData.get("date") || "");
  const employee = String(formData.get("employee") || "");
  const type = String(formData.get("type") || "");
  const noteRaw = String(formData.get("note") || "");
  const amount = Number(formData.get("amount") || 0);

  const note = noteRaw.trim() ? noteRaw.trim() : null;

  if (!date || !employee || !type || amount <= 0) {
    throw new Error("Tanggal, Karyawan, Jenis, dan Nominal wajib diisi.");
  }

  await prisma.employeeIncome.create({
    data: {
      date: new Date(date),
      employee,
      type,
      note,
      amount,
    },
  });

  revalidatePath("/pendapatan-karyawan");
}

export async function deleteEmployeeIncome(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) throw new Error("ID kosong.");

  await prisma.employeeIncome.delete({
    where: { id },
  });

  revalidatePath("/pendapatan-karyawan");
}
