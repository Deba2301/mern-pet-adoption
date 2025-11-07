import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PetList from './components/PetList';
import Login from './components/Login';       
import Register from './components/Register'; 
import AddPet from './components/AddPet'; 
import AdminDashboard from './components/AdminDashboard';


function App() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<PetList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-pet" element={<AddPet />} /> 
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;