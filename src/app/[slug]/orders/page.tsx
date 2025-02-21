import { getOrderByCpf } from "@/data/get-order-by-cpf";
import { isValidCpf } from "@/helpers/cpf";

import CpfForms from "./components/cpf-form";
import OrderList from "./components/order-list";

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { cpf } = await searchParams;

  if(!cpf || !isValidCpf(cpf)) {
    return <CpfForms />
  }

  const orders = await getOrderByCpf(cpf);

  return (
    <OrderList orders={orders} />
  );
};