import { useContext } from "react";
import { AppContext } from "../../context";

export default function useCart() {
  const { cartItems, setCartItems } = useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)
  return { cartItems, setCartItems, totalPrice };
}