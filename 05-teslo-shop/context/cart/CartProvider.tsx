import { useEffect, useReducer, useState } from "react";
import Cookies from "js-cookie";

import { ICartProduct, ShippingAddress } from "../../interfaces";
import { CartContext, cartReducer } from "./";

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  taxRate: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  taxRate: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
};

interface Props {
  children: React.ReactNode;
}
export const CartProvider: React.FunctionComponent<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  // Efecto
  useEffect(() => {
    try {
      const cookieCart = Cookies.get("cart");
      const cookieProducts = cookieCart ? JSON.parse(cookieCart) : [];

      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    const addressCookie: ShippingAddress = JSON.parse(
      Cookies.get("address") || "{}"
    );

    dispatch({
      type: "[Cart] - Load Address from Cookies",
      payload: addressCookie,
    });
  }, []);

  useEffect(() => {
    if (mounted) {
      Cookies.set("cart", JSON.stringify(state.cart));
    }
  }, [state.cart, mounted]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      taxRate,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };

    dispatch({ type: "[Cart] - Update order summary", payload: orderSummary });
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    //! Nivel 1
    // dispatch({ type: '[Cart] - Add Product', payload: product });

    //! Nivel 2
    // const productsInCart = state.cart.filter( p => p._id !== product._id && p.size !== product.size );
    // dispatch({ type: '[Cart] - Add Product', payload: [...productsInCart, product] })

    //! Nivel Final
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCartButDifferentSize)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    // Acumular
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      // Actualizar la cantidad
      p.quantity += product.quantity;
      return p;
    });

    dispatch({
      type: "[Cart] - Update products in cart",
      payload: updatedProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: "[Cart] - Change cart quantity", payload: product });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: "[Cart] - Remove product in cart", payload: product });
  };

  const updateAddress = (address: ShippingAddress) => {
    Cookies.set("address", JSON.stringify(address));

    dispatch({
      type: "[Cart] - Update Address",
      payload: address,
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        // Methods
        addProductToCart,
        removeCartProduct,
        updateCartQuantity,
        updateAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
