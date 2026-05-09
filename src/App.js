import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [phone, setPhone] = useState('');
  const [tracking, setTracking] = useState(false);
  const [time, setTime] = useState('');

  const [location, setLocation] = useState({
    latitude: '',
    longitude: ''
  });

  // ENV VARIABLES
  const appName = process.env.REACT_APP_APP_NAME;
  const version = process.env.REACT_APP_VERSION;
  const enableMap = process.env.REACT_APP_ENABLE_MAP;

  useEffect(() => {

    const currentTime = new Date().toLocaleString();
    setTime(currentTime);

  }, []);

  const startTracking = () => {

    if (phone.length < 10) {
      alert("Please enter valid phone number");
      return;
    }

    setTracking(true);

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });

      },

      (error) => {

        console.log(error);
        alert("Location permission denied");

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
                <p>{location.latitude || "Loading..."}</p>
              </div>

              <div className="info">
                <h3>Longitude</h3>
                <p>{location.longitude || "Loading..."}</p>
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