import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './BusDetails.css';

function BusDetails() {
    const [busRoutes, setBusRoutes] = useState([
        { id: '1', startPoint: 'Station A', endPoint: 'Station B' },
        { id: '2', startPoint: 'Station C', endPoint: 'Station D' },
        { id: '3', startPoint: 'Station E', endPoint: 'Station F' },
    ]);
    const [filteredRoutes, setFilteredRoutes] = useState(busRoutes);
    const [selectedRoute, setSelectedRoute] = useState('');
    const [trackingIds, setTrackingIds] = useState({
        '1': 'ID1',
        '2': 'ID2',
        '3': 'ID3',
    });
    const [selectedBusId, setSelectedBusId] = useState('');
    const navigate = useNavigate();

    // Sample data for the table
    const tableData = [
        { id: '1', busId: 'B001', driverId: 'D001', conductorId: 'C001', startPoint: 'Station A', endPoint: 'Station B', shift: 'Morning', shiftStart: '06:00 AM', shiftEnd: '12:00 PM', day: 'Monday' },
        { id: '2', busId: 'B002', driverId: 'D002', conductorId: 'C002', startPoint: 'Station C', endPoint: 'Station D', shift: 'Afternoon', shiftStart: '12:00 PM', shiftEnd: '06:00 PM', day: 'Tuesday' },
        { id: '3', busId: 'B003', driverId: 'D003', conductorId: 'C003', startPoint: 'Station E', endPoint: 'Station F', shift: 'Evening', shiftStart: '06:00 PM', shiftEnd: '12:00 AM', day: 'Wednesday' },
        // Add more rows as needed
    ];

    // Create bus ID options for the dropdown
    const busIdOptions = tableData.map(row => ({
        value: row.busId,
        label: row.busId,
    }));

    useEffect(() => {
        // Set filteredRoutes initially
        setFilteredRoutes(busRoutes);
    }, [busRoutes]);

    // Handle bus ID selection
    const handleBusIdChange = (selectedOption) => {
        const selectedBusId = selectedOption ? selectedOption.value : '';
        setSelectedBusId(selectedBusId);

        // Automatically select the route based on the Bus ID
        const foundBus = tableData.find(row => row.busId === selectedBusId);
        if (foundBus) {
            const route = busRoutes.find(route => route.startPoint === foundBus.startPoint && route.endPoint === foundBus.endPoint);
            if (route) {
                setSelectedRoute(route.id);
            }
        } else {
            setSelectedRoute(''); // Clear route if no match
        }
    };

    // Dropdown route selection
    const handleBusRouteChange = (e) => {
        setSelectedRoute(e.target.value);
    };

    const handleTrackingIdClick = (trackingId) => {
        navigate(`/live-tracking?busId=${trackingId}&route=${selectedRoute}`);
    };

    return (
        <div className="bus-details-page">
            <h2>Bus Details</h2>

            {/* Searchable Dropdown for Bus ID */}
            <label htmlFor="busId">Select or Search Bus ID:</label>
            <Select
                id="busId"
                name="busId"
                options={busIdOptions}
                value={busIdOptions.find(option => option.value === selectedBusId)}
                onChange={handleBusIdChange}
                isClearable
                placeholder="Select or type Bus ID..."
                className="select-bus-id"
            />

            <label htmlFor="busRoute">Select Bus Route:</label>
            <select
                id="busRoute"
                name="busRoute"
                className="select-route"
                value={selectedRoute}
                onChange={handleBusRouteChange}
            >
                <option value="">Select a route</option>
                {filteredRoutes.map(route => (
                    <option key={route.id} value={route.id}>
                        {`${route.startPoint} - ${route.endPoint}`}
                    </option>
                ))}
            </select>

            {selectedRoute && (
                <div className="tracking-ids">
                    <h3>Tracking ID for selected route:</h3>
                    <ul>
                        <li onClick={() => handleTrackingIdClick(trackingIds[selectedRoute])}>
                            {trackingIds[selectedRoute]}
                        </li>
                    </ul>
                </div>
            )}

            {/* Table */}
            <table className="bus-details-table">
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
                    {tableData.map(row => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.busId}</td>
                            <td>{row.driverId}</td>
                            <td>{row.conductorId}</td>
                            <td>{row.startPoint}</td>
                            <td>{row.endPoint}</td>
                            <td>{row.shift}</td>
                            <td>{row.shiftStart}</td>
                            <td>{row.shiftEnd}</td>
                            <td>{row.day}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BusDetails;
