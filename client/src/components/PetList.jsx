import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PetList() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]); 
  const navigate = useNavigate();
  const token = localStorage.getItem('auth-token');

  
  const [searchTerm, setSearchTerm] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState(''); 

  useEffect(() => {
    fetchPets();
  }, []);

  
  useEffect(() => {
    filterResults();
  }, [pets, searchTerm, speciesFilter, ageFilter]);

  const fetchPets = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/pets');
        setPets(response.data);
        setFilteredPets(response.data); 
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  const filterResults = () => {
    let results = pets;

    
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        results = results.filter(pet =>
            pet.name.toLowerCase().includes(term) ||
            (pet.breed && pet.breed.toLowerCase().includes(term))
        );
    }

    
    if (speciesFilter) {
        results = results.filter(pet => pet.species === speciesFilter);
    }

    
    if (ageFilter) {
        if (ageFilter === 'baby') results = results.filter(pet => pet.age < 1);
        else if (ageFilter === 'young') results = results.filter(pet => pet.age >= 1 && pet.age <= 3);
        else if (ageFilter === 'adult') results = results.filter(pet => pet.age > 3 && pet.age < 8);
        else if (ageFilter === 'senior') results = results.filter(pet => pet.age >= 8);
    }

    setFilteredPets(results);
  };

  const handleAdopt = async (petId) => {
    if (!token) {
        alert("Please login to adopt a pet!");
        navigate('/login');
        return;
    }
    try {
        await axios.post('http://localhost:5000/api/applications', { petId }, { headers: { 'auth-token': token } });
        alert("Application submitted successfully! 🐾");
    } catch (error) {
        alert(error.response?.data?.message || "Error submitting application");
    }
  };

  
  const filterBarStyle = {
      display: 'flex',
      gap: '15px',
      padding: '20px',
      background: '#f5f5f5',
      borderRadius: '10px',
      marginBottom: '20px',
      flexWrap: 'wrap'
  };

  const inputStyle = {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      flex: '1 1 200px' 
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', color: '#646cff' }}>Find Your New Best Friend</h2>

      
      <div style={filterBarStyle}>
          <input
              style={inputStyle}
              type="text"
              placeholder="🔍 Search by Name or Breed..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select style={inputStyle} value={speciesFilter} onChange={(e) => setSpeciesFilter(e.target.value)}>
              <option value="">All Species</option>
              <option value="Dog">Dogs 🐕</option>
              <option value="Cat">Cats 🐈</option>
              <option value="Other">Other</option>
          </select>

          <select style={inputStyle} value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
              <option value="">All Ages</option>
              <option value="baby">Baby (&lt;1 yr)</option>
              <option value="young">Young (1-3 yrs)</option>
              <option value="adult">Adult (3-8 yrs)</option>
              <option value="senior">Senior (8+ yrs)</option>
          </select>
      </div>

      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px', padding: '20px' }}>
        {filteredPets.length > 0 ? (
            filteredPets.map(pet => (
            <div key={pet._id} className="pet-card">
                <img src={pet.imageUrl || "https://via.placeholder.com/250x200?text=No+Image"} alt={pet.name} />
                <div className="pet-card-content">
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <h3>{pet.name}</h3>
                        <span className={`status-badge status-${pet.status}`}>{pet.status}</span>
                    </div>
                    <p><strong>{pet.species}</strong> • {pet.breed}</p>
                    <p>{pet.age} years old</p>

                    
                    <button style={{ width: '100%', marginTop: '10px', backgroundColor: '#333', color: 'white' }}>
                        View Details
                    </button>

                    {pet.status === 'available' && (
                        <button onClick={() => handleAdopt(pet._id)} style={{ width: '100%', marginTop: '10px', backgroundColor: '#646cff', color: 'white' }}>
                            Adopt Me! 🏠
                        </button>
                    )}
                </div>
            </div>
            ))
        ) : (
            <p style={{ textAlign: 'center', gridColumn: '1/-1', fontSize: '1.2em', color: '#666' }}>
                No pets found matching your criteria. 😿
            </p>
        )}
      </div>
    </div>
  );
}

export default PetList;