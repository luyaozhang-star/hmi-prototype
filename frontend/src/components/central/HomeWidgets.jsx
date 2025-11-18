import { useState, useEffect } from 'react';
import { useHMI } from '../../contexts/HMIContext';
import './HomeWidgets.css';

function HomeWidgets({ connected }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { state, dispatchAction } = useHMI();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')}`;
  };

  const formatAMPM = (date) => {
    return date.getHours() >= 12 ? 'PM' : 'AM';
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleToggleMedia = () => {
    dispatchAction({ type: 'TOGGLE_MEDIA' });
  };

  // Mock user data
  const user = {
    name: 'Caleb Jones',
    avatar: '👤'
  };

  // Mock weather data
  const weather = {
    temp: 64,
    condition: 'Partly Cloudy',
    location: 'Santa Clara',
    high: 76,
    low: 58,
    icon: '⛅'
  };

  // Hourly forecast
  const hourlyForecast = [
    { time: '8 PM', icon: '🌙', temp: '' },
    { time: '9 PM', icon: '☁️', temp: '' },
    { time: '10 PM', icon: '☁️', temp: '' },
    { time: '11 PM', icon: '☁️', temp: '' },
    { time: '12 AM', icon: '☁️', temp: '' },
    { time: '1 AM', icon: '🌧️', temp: '' },
    { time: '2 AM', icon: '🌧️', temp: '' }
  ];

  // Calendar data
  const getDaysInMonth = () => {
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  return (
    <div className="home-widgets">
      {/* Top Left - User Profile */}
      <div className="user-widget">
        <div className="user-avatar-small">{user.avatar}</div>
        <span className="user-name-small">{user.name}</span>
      </div>

      {/* Top Right - Status Icons & Weather */}
      <div className="top-right-status">
        <div className="status-icons">
          <div className="status-icon">👤</div>
          <div className="status-icon">👤</div>
          <div className="status-icon">👤</div>
          <div className="status-icon">🔔</div>
        </div>
        <div className="quick-weather">
          <span className="quick-temp">68°F</span>
          <span className="quick-time">{formatTime(currentTime)} {formatAMPM(currentTime)}</span>
        </div>
      </div>

      {/* Center Top - Large Clock */}
      <div className="center-clock">
        <div className="clock-time-large">{formatTime(currentTime)}</div>
        <div className="clock-ampm">{formatAMPM(currentTime)}</div>
        <div className="clock-date-large">{formatDate(currentTime)}</div>
      </div>

      {/* Right Side Widgets */}
      <div className="right-widgets">
        {/* Media Player Widget */}
        <div className="widget media-widget">
          <div className="media-widget-content">
            <div className="album-art-small">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect fill='%232196F3' width='80' height='80'/%3E%3C/svg%3E" alt="Album" />
            </div>
            <div className="media-info-widget">
              <div className="media-title">Recto Verso</div>
              <div className="media-artist">Paradis</div>
            </div>
          </div>
          <div className="media-progress-bar">
            <div className="progress-fill-widget" style={{ width: '40%' }}></div>
          </div>
          <div className="media-controls-widget">
            <button className="media-btn-widget">❤️</button>
            <button className="media-btn-widget">⏮</button>
            <button className="media-btn-widget play-widget" onClick={handleToggleMedia}>
              {state.mediaPlaying ? '⏸' : '▶️'}
            </button>
            <button className="media-btn-widget">⏭</button>
            <button className="media-btn-widget">🔀</button>
          </div>
        </div>

        {/* Calendar Widget */}
        <div className="widget calendar-widget">
          <div className="calendar-header">
            <div className="calendar-month-large">24</div>
            <div className="calendar-date-info">
              <div className="calendar-month-name">November, 2024</div>
              <div className="calendar-day-name">Friday</div>
            </div>
          </div>
          <div className="calendar-grid">
            <div className="calendar-weekdays">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="calendar-weekday">{day}</div>
              ))}
            </div>
            <div className="calendar-days">
              {getDaysInMonth().map((day, i) => (
                <div
                  key={i}
                  className={`calendar-day ${day === 24 ? 'today' : ''} ${!day ? 'empty' : ''}`}
                >
                  {day || ''}
                </div>
              ))}
            </div>
          </div>
          <div className="calendar-event">No events today</div>
        </div>

        {/* Weather Widget */}
        <div className="widget weather-widget">
          <div className="weather-main">
            <div className="weather-temp-large">{weather.temp}°</div>
            <div className="weather-location">{weather.location}</div>
          </div>
          <div className="weather-condition">
            <div className="weather-condition-text">{weather.condition}</div>
            <div className="weather-high-low">Hi: {weather.high} Lo: {weather.low}</div>
          </div>
          <div className="weather-hourly">
            {hourlyForecast.map((hour, i) => (
              <div key={i} className="hourly-item">
                <div className="hourly-icon">{hour.icon}</div>
                <div className="hourly-time">{hour.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeWidgets;

