import './App.css';
import { useEffect, useState } from 'react';

function App() {

  // STATES
  const [phone, setPhone] = useState('');
  const [tracking, setTracking] = useState(false);
  const [status, setStatus] = useState('Idle');
  const [time, setTime] = useState('');

  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
    accuracy: ''
  });

  // ENV VARIABLES
  const appName = process.env.REACT_APP_APP_NAME;
  const version = process.env.REACT_APP_VERSION;
  const enableMap = process.env.REACT_APP_ENABLE_MAP;

  // LIVE CLOCK
  useEffect(() => {

    const interval = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  // START TRACKING
  const startTracking = () => {

    if (phone.length < 10) {
      alert("Please enter valid mobile number");
      return;
    }

    setTracking(true);
    setStatus("Tracking Started");

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.watchPosition(

      (position) => {

        setLocation({
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
          accuracy: position.coords.accuracy.toFixed(2)
        });

        setStatus("Live Location Active");

      },

      (error) => {

        console.log(error);
        setStatus("Permission Denied");

      },

      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }

    );
  };

  return (

    <div className="container">

      <div className="glass-card">

        <h1>📍 {appName}</h1>

        <p className="version">
          Version: {version}
        </p>

        <p className="time">
          {time}
        </p>

        <div className="status-box">
          Status: {status}
        </div>

        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={startTracking}>
          Start Live Tracking
        </button>

        {
          tracking && (

            <div className="result-box">

              <div className="info">
                <h3>Tracking Number</h3>
                <p>{phone}</p>
              </div>

              <div className="info">
                <h3>Latitude</h3>
                <p>{location.latitude || "Fetching..."}</p>
              </div>

              <div className="info">
                <h3>Longitude</h3>
                <p>{location.longitude || "Fetching..."}</p>
              </div>

              <div className="info">
                <h3>Accuracy</h3>
                <p>
                  {
                    location.accuracy
                    ? `${location.accuracy} meters`
                    : "Fetching..."
                  }
                </p>
              </div>

            </div>

          )
        }

        {
          enableMap === "true" &&
          location.latitude &&
          location.longitude && (

            <iframe
              title="map"
              width="100%"
              height="320"
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=17&output=embed`}
            ></iframe>

          )
        }

      </div>

    </div>

  );
}

export default App;