import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './LiveTracking.css';
import L from 'leaflet';

// Leaflet requires the icon images to be manually set
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const LiveTracking = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [route, setRoute] = useState([]);
  const [map, setMap] = useState(null);

  const handleSearch = async () => {
    if (!start || !end) {
      alert('Please enter both start and end points');
      return;
    }

    const responseStart = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${start}`);
    const startData = await responseStart.json();
    const startLatLng = [startData[0].lat, startData[0].lon];

    const responseEnd = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${end}`);
    const endData = await responseEnd.json();
    const endLatLng = [endData[0].lat, endData[0].lon];

    // Fetch the route from ORS API
    const orsResponse = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf624830268735b59b4676a5b37fe9f89bed5f&start=${startLatLng[1]},${startLatLng[0]}&end=${endLatLng[1]},${endLatLng[0]}`);
    const orsData = await orsResponse.json();
    const routeCoordinates = orsData.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);

    setRoute(routeCoordinates);

    if (map) {
      map.setView(startLatLng, 13);
    }
  };

  return (
    <div className="live-tracking-container">
      <div className="search-form">
        <input
          type="text"
          placeholder="Start Point"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <input
          type="text"
          placeholder="End Point"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <MapContainer
        center={[51.505, -0.09]} // Default center
        zoom={13}
        style={{ height: "500px", width: "100%" }}
        whenCreated={setMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {route.length > 0 && (
          <>
            <Marker position={route[0]}>
              <Popup>Start Point</Popup>
            </Marker>
            <Marker position={route[route.length - 1]}>
              <Popup>End Point</Popup>
            </Marker>
            <Polyline positions={route} color="blue" />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default LiveTracking;
