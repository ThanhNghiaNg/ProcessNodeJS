import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import Layout from "./layout/Layout";
import Auth from "./pages/auth/Auth";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Auth login={true} />} />
          <Route path="/sign-up" element={<Auth />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
