"use server";

import { db } from "@/lib/prisma";

export const deleteOrder = async (orderId: number) => {
  const order = await db.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Pedido não encontrado");
  }

  await db.order.delete({
    where: { id: orderId },
  });

  return { success: true };
};
