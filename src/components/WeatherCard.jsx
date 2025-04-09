function WeatherCard({ data, onRefresh }) {
    if (!data) return null;
  
    return (
      <div className="weather-card">
        <div className="card-header">
          <h2>{data.name}, {data.sys.country}</h2>
          <button 
            className="refresh-button"
            onClick={onRefresh}
            aria-label="Refresh weather data"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
          </button>
        </div>
        
        <div className="weather-main">
          <img 
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
            alt={data.weather[0].description}
            className="weather-icon"
          />
          <div className="temperature">
            <h3>{Math.round(data.main.temp)}°C</h3>
            <p className="weather-description">{data.weather[0].description}</p>
          </div>
        </div>
        
        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Feels Like</span>
            <span className="detail-value">{Math.round(data.main.feels_like)}°C</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{data.main.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{data.wind.speed} km/h</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    );
  }
  
  export default WeatherCard;
  