import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import DashBoard from "./components/DashBoard/DashBoard";
import HotelList from "./components/HotelList/HotelList";
import HotelForm from "./components/HotelForm/HotelForm";
import RoomForm from "./components/RoomForm/RoomForm";
import RoomList from "./components/RoomList/RoomList";
import TransactionList from "./components/TransactionList/TransactionList";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Dash board */}
          <Route path="/" element={<DashBoard />} />
          {/* Hotels list */}
          <Route path="/hotels" element={<HotelList />} />
          {/* Add new hotel */}
          <Route path="/add-hotel" element={<HotelForm />} />
          {/* Rooms List */}
          <Route path="/rooms" element={<RoomList />} />
          {/* Add new room */}
          <Route path="/add-room" element={<RoomForm />} />
          {/* View all transactions */}
          <Route path="/transactions" element={<TransactionList />} />
          {/* Edit hotel */}
          <Route path="/edit-hotel/:id" />
          {/* Edit room */}
          <Route path="/edit-room/:id" />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
