import React, { useState, useEffect } from 'react';
import './ConductorList.css';

const ConductorList = () => {
  const [conductors, setConductors] = useState([]);
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/data1'); // Ensure the URL is correct
        const data = await response.json();
        setConductors(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredConductors = searchId
    ? conductors.filter(conductor => conductor.ConductorID.toString().includes(searchId))
    : conductors;

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Conductor ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      {filteredConductors.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Conductor ID</th>
              <th>Bus ID</th>
              <th>Start Point</th>
              <th>End Point</th>
              <th>Shift</th>
              <th>Shift Start</th>
              <th>Shift End</th>
              <th>Day</th>
            </tr>
          </thead>
          <tbody>
            {filteredConductors.map(conductor => (
              <tr key={conductor.ConductorID}>
                <td>{conductor.ConductorID}</td>
                <td>{conductor.BusID}</td>
                <td>{conductor.StartPoint}</td>
                <td>{conductor.EndPoint}</td>
                <td>{conductor.Shift}</td>
                <td>{conductor.ShiftStart}</td>
                <td>{conductor.ShiftEnd}</td>
                <td>{conductor.Day}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No conductors found</p>
      )}
    </div>
  );
};

export default ConductorList;
