import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout/main-layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProductForm from "./components/AddProductForm/AddProductForm";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" />
          <Route path="/add-product" element={<AddProductForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
