import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout/main-layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import ProductDetail from "./components/ProductDetail/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
