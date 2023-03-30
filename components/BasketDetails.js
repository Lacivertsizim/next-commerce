import React from 'react'

import { useContext } from "react";
import { AppContext } from "../utils/context";

const BasketDetails = () => {
    const {cart} = useContext(AppContext);

    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart">
      <h2>Sepetim</h2>
      {cart.length === 0 ? (
        <p>Sepetinizde ürün bulunmamaktadır.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <p>{item.title}</p>
              <p>{item.price} TL</p>
            </div>
          ))}
          <p>Toplam: {totalPrice} TL</p>
        </>
      )}
    </div>
  );
}

export default BasketDetails