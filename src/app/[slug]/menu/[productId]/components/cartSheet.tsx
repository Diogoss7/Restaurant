import { useContext } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CartContext } from "../../context/cart";
 
const CartSheet = () => {
    const{isOpen,toggleCart} = useContext(CartContext)
    return (  

        <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent className="w-[80%]">
           <SheetHeader>
                <SheetTitle>
                    Title
                </SheetTitle>
                <SheetDescription>
                    Description
                    Description
                    Description
                    Description
                </SheetDescription>
          </SheetHeader>
        </SheetContent>
        </Sheet>
    );
}
 
export default CartSheet;