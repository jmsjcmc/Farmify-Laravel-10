import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Link } from '@inertiajs/react'
import { useCart } from './CartContext'

export default function CartDrawer({ children }) {
  const { items, totalPrice, removeItem } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 py-4 space-y-4 overflow-y-auto">
          {items.length ? (
            items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    ₱{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Your cart is empty.
            </p>
          )}
        </div>

        <Separator />

        <SheetFooter className="mt-4">
          <div className="w-full space-y-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₱{totalPrice.toFixed(2)}</span>
            </div>

            <Button asChild className="w-full">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
