"use client";

import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/formatCurrency";

import { deleteOrder } from "../../menu/actions/deletOrder";

interface OrderListProps {
  slug: string;
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true;
            avatarImageUrl: true;
          };
        };
        orderProducts: {
          include: {
            product: true;
          };
        };
      };
    }>
  >;
}

const getStatusLabel = (status: OrderStatus) => {
  if (status === "FINISHED") return "Finalizado";
  if (status === "IN_PREPARATION") return "Em preparo";
  if (status === "PENDING") return "Pendente";
  return "";
};

const OrderList = ({ orders }: OrderListProps) => {
  const router = useRouter();
  const [orderList, setOrderList] = useState(orders);

  const handleBackClick = () => router.back();

  const handleDeleteOrder = async (orderId: number) => {
    try {
      await deleteOrder(orderId);
      setOrderList(orderList.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Erro ao deletar pedido:", error);
    }
  };

  return (
    <div className="space-y-6 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 2xl:p-16">
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>
      {orderList.length === 0 ? (
        <h1>Seu carrinho está vazio</h1>
      ) : (
        <>
          {orderList.map((order) => (
            <Card key={order.id}>
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-fit rounded-full px-2 py-1 text-xs font-semibold text-white ${
                      ([OrderStatus.FINISHED, OrderStatus.FINISHED] as OrderStatus[]).includes(
                        order.status
                      )
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {getStatusLabel(order.status)}
                  </div>
                  <div>
                    <Button
                      className="h-7 w-7 rounded-lg p-0"
                      variant="outline"
                      onClick={() => handleDeleteOrder(Number(order.id))}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative h-5 w-5">
                    <Image
                      src={order.restaurant.avatarImageUrl}
                      alt={order.restaurant.name}
                      className="rounded-sm"
                      fill
                    />
                  </div>
                  <p className="text-sm font-semibold">
                    {order.restaurant.name}
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  {order.orderProducts.map((orderProduct) => (
                    <div
                      key={orderProduct.id}
                      className="flex items-center gap-2"
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                        {orderProduct.quantity}
                      </div>
                      <p className="text-sm">{orderProduct.product.name}</p>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    {formatCurrency(order.total)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default OrderList;
