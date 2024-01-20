import React, { useState } from "react";
import axios from 'axios'

interface IWeatherData {
  city_name: string;
  app_temp: number;
  sunrise: string;
  sunset: string;
  wind_spd: number
}

const Home: React.FC = () => {
  const [ city, setCity ] = useState("");
  const [ weatherData, setWeatherData ] = useState<IWeatherData | null>(null)
  const [ loading, setLoading ] = useState(false)

  const fetchWeatherData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://api.weatherbit.io/v2.0/current?key=6426df4a83c84e1e83813f0e7f3cf65e&city=${city}`)
      setWeatherData(response.data.data[0])
    } catch (error) {
      console.error('Error fetching weather data: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <input type="text" placeholder="Enter City Name" value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={fetchWeatherData}>
        { loading ? 'Fetching Weather data...' : 'Get Weather' }
      </button>

      { weatherData ?
        (<div>
          <div className="item-row">
            <h2>City:</h2>
            <span>{ weatherData?.city_name }</span>
          </div>
          <div className="item-row">
            <h2>Current Temperature:</h2>
            <span>{ weatherData?.app_temp } °C</span>
          </div>
          <div className="item-row">
            <h2>Wind Speed:</h2>
            <span>{ weatherData?.wind_spd } m/s</span>
          </div>
          <div className="horizontal-container">
            <div>
              <span>Sunrise at:</span>
              <span>{ weatherData?.sunrise }</span>
            </div>
            <div>
              <span>Sunset at:</span>
              <span>{ weatherData?.sunrise }</span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>{ loading ? 'Fetching weather data...' : 'Please enter city name' }</p>
        </div>
      )}
    </div>
  )
};

export default Home;
