import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Product, Products, ShopingCart } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product" element={<Product />} />
        <Route path="/shoping-cart" element={<ShopingCart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
