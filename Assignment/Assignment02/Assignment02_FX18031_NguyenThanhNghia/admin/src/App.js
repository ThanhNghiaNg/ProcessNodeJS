import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./layout/Layout";
import DashBoard from "./components/DashBoard/DashBoard";
import HotelList from "./components/HotelList/HotelList";
import HotelForm from "./components/HotelForm/HotelForm";
import RoomForm from "./components/RoomForm/RoomForm";
import RoomList from "./components/RoomList/RoomList";
import TransactionList from "./components/TransactionList/TransactionList";
import AuthForm from "./components/AuthForm/AuthForm";
function App() {
  const token = useSelector((state) => state.auth.token);
  return (
    <BrowserRouter>
      {!token && (
        <Routes>
          <Route path="/*" element={<AuthForm />} />
        </Routes>
      )}
      {token && (
        <Layout>
          <Routes>
            {/* Dash board */}
            <Route path="/" element={<DashBoard />} />
            {/* Hotels list */}
            <Route path="/hotels" element={<HotelList />} />
            {/* Add new hotel */}
            <Route path="/add-hotel" element={<HotelForm />} />
            {/* Edit hotel */}
            <Route path="/edit-hotel/:id" element={<HotelForm edit={true} />} />
            {/* Rooms List */}
            <Route path="/rooms" element={<RoomList />} />
            {/* Add new room */}
            <Route path="/add-room" element={<RoomForm />} />
            {/* Edit room */}
            <Route path="/edit-room/:id" element={<RoomForm edit={true} />} />
            {/* View all transactions */}
            <Route path="/transactions" element={<TransactionList />} />
            {/* Edit room */}
            <Route path="/edit-room/:id" />
          </Routes>
        </Layout>
      )}
    </BrowserRouter>
  );
}

export default App;
