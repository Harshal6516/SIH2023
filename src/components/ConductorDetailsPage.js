import React, { useState, useEffect } from 'react';
import './ConductorDetailsPage.css';


const ConductorList = () => {
  const [conductors, setConductors] = useState([]);
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/data5'); // Ensure the URL is correct
        const data = await response.json();
        setConductors(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredConductors = searchId
    ? conductors.filter(conductor => conductor.ID.toString().includes(searchId))
    : conductors;

  return (
    <div className="conductor-list-container">
      <input
        type="text"
        placeholder="Search by ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      {filteredConductors.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Father/Guardian Name</th>
              <th>Badge</th>
              <th>Token No</th>
              <th>Description</th>
              <th>DOB</th>
              <th>DOJ</th>
            </tr>
          </thead>
          <tbody>
            {filteredConductors.map(conductor => (
              <tr key={conductor.ID}>
                <td>{conductor.ID}</td>
                <td>{conductor.EMP_NAME}</td>
                <td>{conductor.FATHER_GUARD_NAME}</td>
                <td>{conductor.BADGE}</td>
                <td>{conductor.TOKEN_NO}</td>
                <td>{conductor.DESCRIPTION}</td>
                <td>{new Date(conductor.DOB).toLocaleDateString()}</td>
                <td>{new Date(conductor.DOJ).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No records found</p>
      )}
    </div>
  );
};

export default ConductorList;
