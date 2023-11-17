import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Input,
  Checkbox,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import data from "../mockedData.json";
import { Product } from "../components";

export const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(data);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("ascending");
  const [categories, setCategories] = useState([]);
  const [selectedCateogry, setSelectedCategory] = useState();

  useEffect(() => {
    // const fetchProducts = async () => {
    //   try {
    //     const response = await axios.get(
    //       "https://30hills.com/api/products.json"
    //     );
    //   } catch (error) {}
    // };
    // fetchProducts();

    const categories = data.data.items.map((product) => {
      return product.category;
    });

    setCategories(Array.from(new Set(categories)));
  }, []);

  const addToCart = (product) => {
    const productsInStorage = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem(
      "cart",
      JSON.stringify([...productsInStorage, product])
    );
  };

  const productsForRender = products.data.items
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) => {
      if (selectedCateogry) {
        return (
          product.category.toLowerCase() === selectedCateogry.toLowerCase()
        );
      }

      return product;
    })
    .sort((a, b) => {
      if (a.price > b.price) {
        return sort === "ascending" ? 1 : -1;
      } else if (a.price < b.price) {
        return sort === "ascending" ? -1 : 1;
      }

      return 0;
    });

  return (
    <Box>
      <Input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />

      <Box>
        <Box>
          <label htmlFor="price-descending">Sort by Price Descending</label>
          <Checkbox
            checked={sort === "descending"}
            name="price"
            type="checkbox"
            id="price-descending"
            value="descending"
            onChange={(event) => setSort(event.target.value)}
          />
        </Box>

        <Box>
          <label htmlFor="price-ascending">Sort by Price Ascending</label>
          <Checkbox
            checked={sort === "ascending"}
            name="price"
            type="checkbox"
            id="price-ascending"
            value="ascending"
            onChange={(event) => setSort(event.target.value)}
          />
        </Box>
      </Box>

      <Box>
        <Select
          label="Select your category"
          value={selectedCateogry}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <MenuItem disabled>Select your category</MenuItem>
          {categories.map((category) => {
            return (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            );
          })}
        </Select>
      </Box>

      <Link to="/shoping-cart">
        <Typography>Go to Cart</Typography>
      </Link>
      {productsForRender.map((product) => {
        return (
          <Product
            key={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            images={product.images}
            onClick={() =>
              navigate("/product", {
                state: product,
              })
            }
            onAddToCart={() => addToCart(product)}
          />
        );
      })}
    </Box>
  );
};
