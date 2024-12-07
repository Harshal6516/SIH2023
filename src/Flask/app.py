from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Function to get coordinates from OpenStreetMap Nominatim
def get_coordinates(location):
    response = requests.get(
        'https://nominatim.openstreetmap.org/search',
        params={'q': location, 'format': 'json', 'addressdetails': 1}
    )
    data = response.json()
    if data:
        return float(data[0]['lat']), float(data[0]['lon'])
    return None

# Route to get the route
@app.route('/get_route', methods=['POST'])
def get_route():
    data = request.json
    from_location = data.get('from')
    to_location = data.get('to')

    from_coords = get_coordinates(from_location)
    to_coords = get_coordinates(to_location)

    if from_coords and to_coords:
        route = [
            [from_coords[0], from_coords[1]],
            [to_coords[0], to_coords[1]]
        ]
        return jsonify({'route': route})
    return jsonify({'error': 'Unable to find one or both locations'}), 400

if __name__ == '__main__':
    app.run(debug=True)