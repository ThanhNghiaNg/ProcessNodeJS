import "./App.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<UserForm />}></Route>
          <Route path="/users" element={<UserList />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
