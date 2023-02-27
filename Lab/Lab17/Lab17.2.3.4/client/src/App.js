import "./App.css";
import Layout from "./components/Layout/main-layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProductForm from "./components/AddProductForm/AddProductForm";
import ProductList from "./components/ProductList/ProductList";
import CartList from "./components/CartList/CartList";
import OrderList from "./components/OrderList/OrderList";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";

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
          <Route path="/orders" element={<OrderList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/*" element={<p>Page Not Found!</p>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
