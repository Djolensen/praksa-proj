import { useLocation } from "react-router-dom";

export const Product = () => {
  const location = useLocation();
  const product = location.state;

  if (!product) {
    return <h1>Sorry no product found.</h1>;
  }

  return (
    <div>
      <p>{product.category}</p>
      <div>
        {product.images
          ? product.images.map((image, index) => {
              return <img key={`${image}-${index}`} src={image} />;
            })
          : null}
      </div>
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    </div>
  );
};
