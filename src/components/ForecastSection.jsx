import { useState, useEffect } from 'react';

function ForecastSection({ city, apiKey }) {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;
    
    const fetchForecast = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch forecast data');
        }
        
        const data = await response.json();
        
        // Process forecast data to get one forecast per day
        const dailyForecasts = processForecastData(data.list);
        setForecastData(dailyForecasts);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchForecast();
  }, [city, apiKey]);

  // Process the forecast data to get one forecast per day (at noon)
  const processForecastData = (forecastList) => {
    const dailyData = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toISOString().split('T')[0]; // Get YYYY-MM-DD format
      
      // If we haven't stored this day yet, or if this forecast is closer to noon than what we have
      if (!dailyData[day] || Math.abs(date.getHours() - 12) < Math.abs(new Date(dailyData[day].dt * 1000).getHours() - 12)) {
        dailyData[day] = item;
      }
    });
    
    // Convert to array and limit to 5 days
    return Object.values(dailyData).slice(0, 5);
  };

  if (loading) {
    return (
      <div className="forecast-loading">
        <div className="loading-spinner small"></div>
        <p>Loading forecast...</p>
      </div>
    );
  }

  if (error) {
    return <p className="forecast-error">Unable to load forecast data</p>;
  }

  if (!forecastData || forecastData.length === 0) {
    return null;
  }

  return (
    <section className="forecast-section">
      <h3>5-Day Forecast</h3>
      <div className="forecast-cards">
        {forecastData.map((day) => {
          const date = new Date(day.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          
          return (
            <div className="forecast-day" key={day.dt}>
              <div className="forecast-date">
                <span className="day-name">{dayName}</span>
                <span className="date">{formattedDate}</span>
              </div>
              <img 
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
                alt={day.weather[0].description}
              />
              <div className="forecast-temp">
                <span className="high">{Math.round(day.main.temp_max)}°</span>
                <span className="low">{Math.round(day.main.temp_min)}°</span>
              </div>
              <p className="forecast-desc">{day.weather[0].main}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ForecastSection;