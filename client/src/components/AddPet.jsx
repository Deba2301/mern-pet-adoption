import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddPet() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', species: '', breed: '', age: '', description: '', imageUrl: '', status: 'available'
  });


  useEffect(() => {
     const user = JSON.parse(localStorage.getItem('user'));
     if (!user || user.role !== 'admin') {
         alert("Access Denied: Admins only.");
         navigate('/');
     }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth-token'); 

    try {
        await axios.post(
            'http://localhost:5000/api/pets',
            formData,
            { headers: { 'auth-token': token } } 
        );
        alert('Pet Added Successfully!');
        navigate('/');
    } catch (err) {
        
        alert(err.response?.data?.message || 'Error adding pet');
    }
  };

  const inputStyle = { width: '100%', padding: '10px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc' };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', background: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', color: '#333' }}>
      <h2 style={{ textAlign: 'center', color: '#646cff' }}>Add a New Pet</h2>
      <form onSubmit={handleSubmit}>
        <input style={inputStyle} name="name" placeholder="Pet Name" onChange={handleChange} required />
        <select style={inputStyle} name="species" onChange={handleChange} required>
            <option value="">Select Species</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Other">Other</option>
        </select>
        <input style={inputStyle} name="breed" placeholder="Breed" onChange={handleChange} />
        <input style={inputStyle} type="number" name="age" placeholder="Age" onChange={handleChange} />
        <select style={inputStyle} name="status" onChange={handleChange}>
             <option value="available">Available</option>
             <option value="pending">Pending</option>
             <option value="adopted">Adopted</option>
        </select>
        <textarea style={{...inputStyle, height: '100px'}} name="description" placeholder="Description" onChange={handleChange} required />
        <input style={inputStyle} name="imageUrl" placeholder="Image URL" onChange={handleChange} />

        <button type="submit" style={{ width: '100%', marginTop: '15px', backgroundColor: '#646cff', color: 'white', padding: '12px' }}>
            Add Pet 🐾
        </button>
      </form>
    </div>
  );
}

export default AddPet;