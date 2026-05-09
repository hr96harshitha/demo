import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [location, setLocation] = useState({
    latitude: '',
    longitude: ''
  });

  const [loading, setLoading] = useState(false);

  // ENV VARIABLES
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const appName = process.env.REACT_APP_APP_NAME;

  useEffect(() => {
    console.log("Secret Key:", secretKey);
    console.log("App Name:", appName);
  }, [secretKey, appName]);

  const getLocation = () => {

    setLoading(true);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });

        setLoading(false);
      },

      (error) => {
        console.log(error);
        alert("Unable to fetch location");
        setLoading(false);
      }

    );
  };

  return (
    <div className="container">

      <div className="glass-card">

        <h1>📍 Live Location Tracker</h1>

        <p className="subtitle">
          Secure GPS Tracking App
        </p>

        <button onClick={getLocation}>
          {loading ? "Fetching..." : "Get Live Location"}
        </button>

        <div className="location-box">

          <div className="info">
            <h3>Latitude</h3>
            <p>{location.latitude || "Not Available"}</p>
          </div>

          <div className="info">
            <h3>Longitude</h3>
            <p>{location.longitude || "Not Available"}</p>
          </div>

        </div>

        {
          location.latitude && location.longitude && (

            <iframe
              title="map"
              width="100%"
              height="300"
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
            ></iframe>

          )
        }

      </div>

    </div>
  );
}

export default App;