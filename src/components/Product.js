import { Box, Button, Typography } from "@mui/material";

const placeholderImage =
  "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081";

export const Product = ({
  name,
  description,
  price,
  images = [],
  onClick,
  onAddToCart,
}) => {
  const productImage = images.length !== 0 ? images[0] : placeholderImage;

  return (
    <Box
      sx={{
        padding: "20px",
      }}
    >
      <Box>
        <img src={productImage} alt="Product" />
      </Box>
      <Box>
        <Typography
          variant="h4"
          onClick={onClick}
          style={{ cursor: "pointer" }}
        >
          {name}
        </Typography>
        <Typography>{description}</Typography>
        <Box>
          <Typography>{price}</Typography>
          <Button variant="contained" color="secondary" onClick={onAddToCart}>
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
