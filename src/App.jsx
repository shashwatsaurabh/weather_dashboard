import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastSection from './components/ForecastSection';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import RecentSearches from './components/RecentSearches';
import ThemeToggle from './components/ThemeToggle';
import WeatherBackground from './components/WeatherBackground';


// Helper function
const getWeatherClass = (weatherMain) => {
  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return 'sunny';
    case 'clouds':
      return 'cloudy';
    case 'rain':
    case 'drizzle':
      return 'rainy';
    case 'snow':
      return 'snowy';
    case 'thunderstorm':
      return 'stormy';
    default:
      return '';
  }
};

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const API_KEY = '6080d3e0ff31adc2da8cfa139d6e94e2'; // Replace with your real API key

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  // Reset video loaded state when weather changes
  useEffect(() => {
    if (weatherData) {
      setVideoLoaded(false);
    }
  }, [weatherData]);

  const fetchWeatherData = async (cityName) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? 'City not found. Please check the spelling and try again.'
            : 'Failed to fetch weather data. Please try again later.'
        );
      }

      const data = await response.json();
      setWeatherData(data);
      updateRecentSearches(cityName);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const updateRecentSearches = (cityName) => {
    const updatedSearches = [
      cityName,
      ...recentSearches.filter(item => item.toLowerCase() !== cityName.toLowerCase())
    ].slice(0, 5);

    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeatherData(searchCity);
  };

  const handleRecentSearchClick = (cityName) => {
    setCity(cityName);
    fetchWeatherData(cityName);
  };

  const refreshWeather = () => {
    if (city) {
      fetchWeatherData(city);
    }
  };

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  const weatherClass = weatherData ? getWeatherClass(weatherData.weather[0].main) : '';

  // Maps direct video links to weather conditions
  const getWeatherVideoSrc = () => {
    if (!weatherClass) return null;
    
    // Direct video embed links
    const videoSources = {
      // For sunny - Aerial shot of sunset
      sunny: "https://player.vimeo.com/external/239725126.sd.mp4?s=e21daf8414f5657006bcfa0a9545a023a168ab02&profile_id=164&oauth2_token_id=57447761",
      
      // For cloudy - Clouds formation covers the ray of sun
      cloudy: "https://player.vimeo.com/external/392629711.sd.mp4?s=5925c2f8e5b1c02300a65e5001a9bd3e064c2ba4&profile_id=164&oauth2_token_id=57447761",
      
      // For rainy - A rainy night
      rainy: "https://player.vimeo.com/external/315992310.sd.mp4?s=2e186d7feafce146cba1ddb4ca47e834c2909887&profile_id=164&oauth2_token_id=57447761",
      
      // For snowy (using silhouette mountain as placeholder)
      snowy: "https://player.vimeo.com/external/480634133.sd.mp4?s=bcd3ec9f4cd9ace8c1a17a3404b2c47c4968a365&profile_id=164&oauth2_token_id=57447761",
      
      // For stormy (using rainy night as it's closest)
      stormy: "https://player.vimeo.com/external/315992310.sd.mp4?s=2e186d7feafce146cba1ddb4ca47e834c2909887&profile_id=164&oauth2_token_id=57447761",
    };
    
    return videoSources[weatherClass] || null;
  };

  const videoSrc = getWeatherVideoSrc();

  return (
    <div className={`app ${darkMode ? 'dark-theme' : 'light-theme'} ${weatherClass}`}>
      {/* Add Video Background */}
      {videoSrc && (
        <div className="video-background">
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            style={{ opacity: videoLoaded ? 0.8 : 0 }}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support video backgrounds.
          </video>
        </div>
      )}
      
      <header>
        <h1>Weather Dashboard</h1>
        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
      </header>

      <main>
        <SearchBar onSearch={handleSearch} />

        {recentSearches.length > 0 && (
          <RecentSearches
            searches={recentSearches}
            onSearchClick={handleRecentSearchClick}
          />
        )}

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {weatherData && !loading && !error && (
          <>
            <WeatherCard data={weatherData} onRefresh={refreshWeather} />
            <ForecastSection city={city} apiKey={API_KEY} />
          </>
        )}
      </main>

      <footer>
        <p> Weather data from OpenWeatherMap</p>
      </footer>
    </div>
  );
}

export default App;