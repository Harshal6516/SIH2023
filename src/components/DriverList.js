import React, { useState, useEffect } from 'react';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [filteredDrivers, setFilteredDrivers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/data'); // Your backend URL
        const data = await response.json();
        console.log("Fetched data:", data);  // Log the raw data to check structure
        setDrivers(data);  // Store the complete data in state
        setFilteredDrivers(data);  // Initially, display all drivers
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Search functionality inside useEffect
  useEffect(() => {
    // Only filter if drivers is an array
    if (Array.isArray(drivers)) {
      const filtered = searchId
        ? drivers.filter(driver => driver.DriverID.toString().includes(searchId))
        : drivers;

      setFilteredDrivers(filtered);  // Update filtered drivers on input change
    }
  }, [searchId, drivers]);

  return (
    <div>
      <h1>Driver List</h1>
      <div>
        <input
          type="text"
          placeholder="Search by Driver ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Bus ID</th>
            <th>Driver ID</th>
            <th>Start Point</th>
            <th>End Point</th>
            <th>Shift</th>
            <th>Shift Start</th>
            <th>Shift End</th>
            <th>Day</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrivers.length > 0 ? (
            filteredDrivers.map((driver, index) => (
              <tr key={index}>
                <td>{driver.ID}</td>
                <td>{driver.BusID}</td>
                <td>{driver.DriverID}</td>
                <td>{driver.StartPoint}</td>
                <td>{driver.EndPoint}</td>
                <td>{driver.Shift}</td>
                <td>{driver.ShiftStart}</td>
                <td>{driver.ShiftEnd}</td>
                <td>{driver.Day}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No drivers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DriverList;
