import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../contexts/cart";
import CartProductItems from "./cart-product-items";
import FinishOrderDialog from "./finish-order-dialog";

export default function CartSheet() {
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);
  const { isOpen, toggleCart, products, total } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col p-5">
          <div className="flex-auto overflow-y-auto max-h-[calc(100vh-230px)]">
            {products.map((product) => (
              <CartProductItems product={product} key={product.id} />
            ))}
          </div>
          <Card className="mb-6">
            <CardContent className="flex justify-between p-5">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-sm font-semibold">{formatCurrency(total)}</p>
            </CardContent>
          </Card>
          <Button
            className="w-full rounded-full"
            onClick={() => setFinishOrderDialogIsOpen(true)}
          >
            Finalizar Pedido
          </Button>

          <FinishOrderDialog
            open={finishOrderDialogIsOpen}
            onOpenChange={setFinishOrderDialogIsOpen}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};