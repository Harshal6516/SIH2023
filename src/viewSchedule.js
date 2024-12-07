import React, { useState, useEffect } from 'react';
import './viewSchedule.css';

const ConductorsList = () => {
  const [conductors, setConductors] = useState([]);
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/data3'); // Ensure the URL is correct
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
        placeholder="Search by Schedule ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      {filteredConductors.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>BusID</th>
              <th>DriverID</th>
              <th>ConductorID</th>
              <th>StartPoint</th>
              <th>EndPoint</th>
              <th>Shift</th>
              <th>ShiftStart</th>
              <th>ShiftEnd</th>
              <th>Day</th>
            </tr>
          </thead>
          <tbody>
            {filteredConductors.map(conductor => (
              <tr key={conductor.ID}>
                <td>{conductor.ID}</td>
                <td>{conductor.BusID}</td>
                <td>{conductor.DriverID}</td>
                <td>{conductor.ConductorID}</td>
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
        <p>No records found</p>
      )}
    </div>
  );
};

export default ConductorsList;
