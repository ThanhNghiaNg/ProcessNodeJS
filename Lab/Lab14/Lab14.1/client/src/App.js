import "./App.css";
import Layout from "./components/Layout/main-layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProductForm from "./components/AddProductForm/AddProductForm";
import ProductList from "./components/ProductList/ProductList";
import CartList from "./components/CartList/CartList";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/admin-products" element={<ProductList edit={true} />} />
          <Route
            path="/edit-product/:id"
            element={<AddProductForm edit={true} />}
          />
          <Route path="/cart" element={<CartList />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
