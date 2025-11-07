import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('auth-token');

  useEffect(() => {
    if (!token) {
        alert("Admin access only");
        navigate('/login');
        return;
    }
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/applications', {
        headers: { 'auth-token': token }
      });
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusUpdate = async (appId, newStatus) => {
      try {
          
          await axios.put(`http://localhost:5000/api/applications/${appId}`,
              { status: newStatus },
              { headers: { 'auth-token': token } }
          );
          alert(`Application ${newStatus}!`);
          fetchApplications(); 
      } catch (err) {
          alert("Error updating status");
      }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ color: '#646cff' }}>Admin Dashboard</h2>
      <h3>Adoption Applications</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#333', color: 'white', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Pet</th>
            <th style={{ padding: '10px' }}>Applicant</th>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Status</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app._id} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px' }}>{app.pet?.name || 'Unknown Pet'}</td>
              <td style={{ padding: '10px' }}>{app.user?.username || 'Unknown User'}</td>
              <td style={{ padding: '10px' }}>{app.user?.email}</td>
              <td style={{ padding: '10px' }}>
                <span className={`status-badge status-${app.status || 'pending'}`}>
                    {app.status || 'pending'}
                </span>
              </td>
              <td style={{ padding: '10px', display: 'flex', gap: '10px' }}>
                {app.status === 'pending' && (
                    <>
                        <button
                            onClick={() => handleStatusUpdate(app._id, 'approved')}
                            style={{ background: 'green', color: 'white', padding: '5px 10px', fontSize: '0.8em' }}>
                            Approve
                        </button>
                        <button
                            onClick={() => handleStatusUpdate(app._id, 'rejected')}
                            style={{ background: 'red', color: 'white', padding: '5px 10px', fontSize: '0.8em' }}>
                            Reject
                        </button>
                    </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;