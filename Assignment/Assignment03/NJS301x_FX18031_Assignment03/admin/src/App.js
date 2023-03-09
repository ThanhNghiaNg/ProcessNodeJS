import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Chat from "./pages/Chat";
import Layout from "./Layout/Layout";
import AuthForm from "./components/AuthForm/AuthForm";
import { useSelector, useDispatch } from "react-redux";
// import { authActions } from "./store/authSlice";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  // const dispatch = useDispatch();
  // // Logout when user close browser
  // window.onload = () => {
  //   const cookies = document.cookie;
  //   if (cookies.indexOf("connect.sid") === -1) {
  //     dispatch(authActions.logout());
  //   }
  // };

  return (
    <BrowserRouter>
      {!isLoggedIn && <AuthForm />}
      {isLoggedIn && (
        <Layout>
          <Routes>
            {role === "admin" && (
              <>
                <Route path="/" element={<DashBoard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/create-product" element={<CreateProduct />} />
                <Route path="/update-product/:id" element={<UpdateProduct />} />
              </>
            )}
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route
              path="/*"
              element={<p className="text-center fs-1">Page not founds</p>}
            />
          </Routes>
        </Layout>
      )}
    </BrowserRouter>
  );
}

export default App;
