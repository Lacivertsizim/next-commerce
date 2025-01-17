import React, { useContext, useState } from "react";
import AppContext from "@/utils/context";

import { RiDeleteBin5Line } from "react-icons/ri";
import Head from "next/head";
import AuthContext from "@/utils/authContext";

function Index() {
  const { cart, products, setCart } = useContext(AppContext);
  const { getUserCart, user } = useContext(AuthContext);

  const productIds = cart.map((item) => item.productId);

  const productsInCart = productIds.map((id) => {
    return products.data.find((product) => product._id === id);
  });

  const total = productsInCart.reduce((acc, cur) => acc + cur?.price, 0);

  const handleRemove = (prod_id) => {
    fetch(`${process.env.BACKEND_URL}/products/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id, productId: prod_id }),
    })
      .then((response) => response.json())
      .then(async (response) => {
        let newCart = await getUserCart(user.id);
        setCart(newCart.cart.products);
      })
      .catch((error) => {
        console.error("There was an error with the delete request", error);
      });
  };

  return (
    <>
      <Head>
        <title>Basket</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex bg-slate-200 h-full">
        <div className="w-2/3 overflow-auto h-[86vh] p-4">
          {productsInCart.length == 0 ? (
            <div className="h-full bg-red-300 flex flex-col justify-center">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" />
              <p className="text-center">Sepetinizde ürün bulunmamaktadır.</p>
            </div>
          ) : (
            productsInCart?.map((product, index) => (
              <div key={index}>
                <div className="relative flex m-4 items-center">
                  <div className="w-1/3 flex justify-center">
                    <img src={`${product?.image}`} alt="" className="w-40" />
                  </div>
                  <div className="w-2/3 flex flex-col space-y-4">
                    <h2>{product?.title}</h2>
                    <p>${product?.price}</p>
                    <p className="text-sm text-gray-400">
                      {product?.description}
                    </p>
                  </div>
                  <div className="absolute right-0 bottom-0">
                    <RiDeleteBin5Line
                      onClick={() => handleRemove(product?._id)}
                      className="text-red-500 text-xl cursor-pointer"
                    />
                  </div>
                </div>
                <hr className="h-px my-2 bg-black border-0" />
              </div>
            ))
          )}
        </div>
        <div className=" static h-[86vh] bg-red-100 w-1/3 ">
          <div className="sticky top-[8vh] py-5 h-full flex flex-col justify-end items-end p-4">
            <h2 className="">
              Total ${!isNaN(total?.toFixed(2)) && total?.toFixed(2)}
            </h2>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}

export default Index;
