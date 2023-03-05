import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Chat from "./pages/Chat";
import Layout from "./Layout/Layout";
import AuthForm from "./components/AuthForm/AuthForm";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <BrowserRouter>
      {!isLoggedIn && <AuthForm />}
      {isLoggedIn && (
        <Layout>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/update-product/:id" element={<UpdateProduct />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Layout>
      )}
    </BrowserRouter>
  );
}

export default App;
