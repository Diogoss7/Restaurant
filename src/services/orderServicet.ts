"use client"

export const removeOrder = async (orderId: number) => {
  try {
    const order = await prisma.order.delete({
      where: { id: orderId },
    });
    return order;
  } catch (error) {
    console.error("Erro ao remover pedido:", error);
    throw new Error("Não foi possível remover o pedido");
  }
};
