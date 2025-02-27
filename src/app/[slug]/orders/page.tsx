import { db } from "@/lib/prisma";

import { isValidCpf, removeCpfPunctuation } from "../menu/helpers/cpf";
import CpfForm from "./component/cpfForm";
import OrderList from "./component/orderList";

interface OrdersPageProps {
    searchParams: Promise<{ cpf: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
    const { cpf } = await searchParams;

    if (!cpf) {
        return <CpfForm />
    }
    if (!isValidCpf(cpf)) {
        return <CpfForm />
    }
    const orders = await db.order.findMany({
        where: {
            customerCpf: removeCpfPunctuation(cpf)
        },
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true
                },
            },
            orderProducts:{
                include:{
                product:true
                }
            }
        }
    })
    return (
        <h1>
            <OrderList orders={orders} />
        </h1>);
}

export default OrdersPage;