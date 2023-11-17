import { useState, useEffect } from "react";
import { Product } from "../components";

export const ShopingCart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsInCart = JSON.parse(localStorage.getItem("cart")) || [];
    setProducts(productsInCart);
  }, []);

  return (
    <div>
      {products.length !== 0 ? (
        products.map((product) => {
          return (
            <Product
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              images={product.images}
            />
          );
        })
      ) : (
        <h1>No Products in Cart</h1>
      )}
    </div>
  );
};
