import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('auth-token');
  
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', background: '#646cff', color: 'white', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ margin: '0 20px 0 0' }}>🐾 PetAdopt</h2>
        <Link to="/" style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}>Home</Link>

       
        {user && user.role === 'admin' && (
           <Link to="/add-pet" style={{ marginRight: '15px', color: '#ffd700', textDecoration: 'none', fontWeight: 'bold' }}>+ Add Pet</Link>
        )}
      </div>

      <div>
        {!token ? (
          <>
            <Link to="/login" style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ padding: '8px 15px', background: 'white', color: '#646cff', borderRadius: '20px', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            
             {user && user.role === 'admin' && (
                <Link to="/admin" style={{ color: '#ff9999', textDecoration: 'none', fontWeight: 'bold', border: '1px solid #ff9999', padding: '5px 10px', borderRadius: '5px' }}>
                    Admin Dashboard
                </Link>
             )}

             <span style={{ fontSize: '0.9em' }}>Welcome, {user?.username}</span>
            <button
              onClick={handleLogout}
              style={{ padding: '8px 15px', background: 'transparent', border: '1px solid white', color: 'white', borderRadius: '20px' }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;