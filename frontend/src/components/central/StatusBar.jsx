import { useState, useEffect } from 'react';
import './StatusBar.css';

function StatusBar() {
  const [currentTime, setCurrentTime] = useState(new Date());

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
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <div className="status-bar">
      {/* Left: User Profile */}
      <div className="status-left">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_1300_86898)">
            <g clipPath="url(#clip1_1300_86898)">
              <path d="M15 0C23.2795 3.58142e-07 30 6.7206 30 15C30 23.2795 23.2795 30 15 30C6.7206 30 3.58119e-07 23.2795 0 15C0 6.7206 6.7206 0 15 0ZM15 2.5C8.08825 2.5 2.5 8.08825 2.5 15C2.5 18.2077 3.70461 21.1295 5.68555 23.3408C7.17774 21.5871 10.5812 20 15 20C19.4237 20 22.8252 21.5824 24.3135 23.3408C26.2947 21.1294 27.5 18.208 27.5 15C27.5 8.08825 21.9118 2.5 15 2.5ZM15 6.5293C17.8235 6.5293 20.0439 8.98547 20.0439 11.9561C20.0439 15.1178 17.8382 17.5295 15 17.5C12.1765 17.4706 9.97083 15.1178 9.95605 11.9561C9.94136 8.98547 12.1765 6.5293 15 6.5293Z" fill="white" fillOpacity="0.9"/>
            </g>
          </g>
          <defs>
            <clipPath id="clip0_1300_86898">
              <rect width="30" height="30" rx="15" fill="white"/>
            </clipPath>
            <clipPath id="clip1_1300_86898">
              <rect width="30" height="30" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <span className="user-name">Caleb Jones</span>
      </div>

      {/* Right: Weather & Time */}
      <div className="status-right">
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.5" filter="url(#filter0_f_1300_86915)">
            <circle cx="14.668" cy="13.334" r="10" fill="#FFEE94"/>
          </g>
          <g filter="url(#filter1_i_1300_86915)">
            <circle cx="14.668" cy="13.334" r="10" fill="url(#paint0_linear_1300_86915)"/>
          </g>
          <g opacity="0.5" filter="url(#filter2_f_1300_86915)">
            <g filter="url(#filter3_i_1300_86915)">
              <path d="M26.9618 22.728C27.0187 22.4055 27.0483 22.0738 27.0483 21.7352C27.0483 18.5677 24.4544 16 21.2548 16C18.8761 16 16.8322 17.4191 15.9399 19.4487C15.2171 18.8309 14.2792 18.4579 13.2542 18.4579C10.9687 18.4579 9.11592 20.3124 9.11592 22.6C9.11592 22.7274 9.12167 22.8534 9.13291 22.9779C8.03363 23.5109 7.2767 24.6293 7.2767 25.9228C7.2767 27.7327 8.75891 29.2 10.5873 29.2H26.2207C28.049 29.2 29.5312 27.7327 29.5312 25.9228C29.5312 24.365 28.4334 23.0611 26.9618 22.728Z" fill="url(#paint1_linear_1300_86915)"/>
            </g>
          </g>
          <g filter="url(#filter5_i_1300_86915)">
            <path d="M26.9618 22.728C27.0187 22.4055 27.0483 22.0738 27.0483 21.7352C27.0483 18.5677 24.4544 16 21.2548 16C18.8761 16 16.8322 17.4191 15.9399 19.4487C15.2171 18.8309 14.2792 18.4579 13.2542 18.4579C10.9687 18.4579 9.11592 20.3124 9.11592 22.6C9.11592 22.7274 9.12167 22.8534 9.13291 22.9779C8.03363 23.5109 7.2767 24.6293 7.2767 25.9228C7.2767 27.7327 8.75891 29.2 10.5873 29.2H26.2207C28.049 29.2 29.5312 27.7327 29.5312 25.9228C29.5312 24.365 28.4334 23.0611 26.9618 22.728Z" fill="url(#paint2_linear_1300_86915)"/>
          </g>
          <defs>
            <filter id="filter0_f_1300_86915" x="1.66797" y="0.333984" width="26" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_1300_86915"/>
            </filter>
            <filter id="filter1_i_1300_86915" x="4.66797" y="3.33398" width="20" height="20.6239" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="0.623892"/>
              <feGaussianBlur stdDeviation="0.623892"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1300_86915"/>
            </filter>
            <filter id="filter2_f_1300_86915" x="2.27734" y="11" width="32.2539" height="23.1992" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="2.5" result="effect1_foregroundBlur_1300_86915"/>
            </filter>
            <filter id="filter3_i_1300_86915" x="7.27734" y="16" width="22.2539" height="14.8356" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1.8"/>
              <feGaussianBlur stdDeviation="0.818182"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1300_86915"/>
            </filter>
            <filter id="filter5_i_1300_86915" x="7.27734" y="16" width="22.2539" height="14.8356" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1.8"/>
              <feGaussianBlur stdDeviation="0.818182"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1300_86915"/>
            </filter>
            <linearGradient id="paint0_linear_1300_86915" x1="26.4302" y1="3.01088" x2="13.7019" y2="24.5951" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFEE94"/>
              <stop offset="1" stopColor="#FF9900"/>
            </linearGradient>
            <linearGradient id="paint1_linear_1300_86915" x1="8.69219" y1="28.0214" x2="31.1297" y2="11.2282" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="white" stopOpacity="0.58"/>
            </linearGradient>
            <linearGradient id="paint2_linear_1300_86915" x1="8.69219" y1="28.0214" x2="31.1297" y2="11.2282" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="white" stopOpacity="0.58"/>
            </linearGradient>
          </defs>
        </svg>
        <span className="weather-text">68°F</span>
        <span className="time-text">{formatTime(currentTime)}</span>
      </div>
    </div>
  );
}

export default StatusBar;
