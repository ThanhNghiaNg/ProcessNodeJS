import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout/main-layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import AdminProduct from "./pages/AdminProduct";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<AddProduct />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/admin-products" element={<AdminProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
