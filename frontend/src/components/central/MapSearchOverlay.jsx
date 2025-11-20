import { useState } from 'react';
import './MapSearchOverlay.css';

function MapSearchOverlay({ isOpen, onClose, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const shortcuts = [
    { 
      id: 'home', 
      label: 'Home',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 8.25464L22.6666 14.2546V24.668H20V16.668H12V24.668H9.33329V14.2546L16 8.25464ZM16 4.66797L2.66663 16.668H6.66663V27.3346H14.6666V19.3346H17.3333V27.3346H25.3333V16.668H29.3333L16 4.66797Z" fill="#F0F4F8"/>
        </svg>
      )
    },
    { 
      id: 'work', 
      label: 'Work',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.6666 8.66536V5.9987H13.3333V8.66536H18.6666ZM5.33329 11.332V25.9987H26.6666V11.332H5.33329ZM26.6666 8.66536C28.1466 8.66536 29.3333 9.85203 29.3333 11.332V25.9987C29.3333 27.4787 28.1466 28.6654 26.6666 28.6654H5.33329C3.85329 28.6654 2.66663 27.4787 2.66663 25.9987L2.67996 11.332C2.67996 9.85203 3.85329 8.66536 5.33329 8.66536H10.6666V5.9987C10.6666 4.5187 11.8533 3.33203 13.3333 3.33203H18.6666C20.1466 3.33203 21.3333 4.5187 21.3333 5.9987V8.66536H26.6666Z" fill="#F0F4F8"/>
        </svg>
      )
    }
  ];
  
  const nearbyCategories = [
    { 
      id: 'food', 
      label: 'Food',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 8V5C16 3.89543 16.8954 3 18 3C19.1046 3 20 3.89543 20 5V20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20V13M8 3V21M6 3V7M10 3V7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#f79009'
    },
    { 
      id: 'coffee', 
      label: 'Coffee',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 11H19C20.1046 11 21 11.8954 21 13V14C21 15.1046 20.1046 16 19 16H17M6 21H14C16.2091 21 18 19.2091 18 17V7C18 5.89543 17.1046 5 16 5H4C2.89543 5 2 5.89543 2 7V17C2 19.2091 3.79086 21 6 21ZM6 3C6 3.55228 5.55228 4 5 4C4.44772 4 4 3.55228 4 3C4 2.44772 4.44772 2 5 2C5.55228 2 6 2.44772 6 3ZM9 3C9 3.55228 8.55228 4 8 4C7.44772 4 7 3.55228 7 3C7 2.44772 7.44772 2 8 2C8.55228 2 9 2.44772 9 3ZM12 3C12 3.55228 11.5523 4 11 4C10.4477 4 10 3.55228 10 3C10 2.44772 10.4477 2 11 2C11.5523 2 12 2.44772 12 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#c19b5f'
    },
    { 
      id: 'charging', 
      label: 'Charging',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#12b76a'
    },
    { 
      id: 'shopping', 
      label: 'Shopping',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 3L2.26491 3.0883C3.58495 3.52832 4.24497 3.74832 4.62248 4.2721C5 4.79587 5 5.49159 5 6.88304V9.5C5 12.3284 5 13.7426 5.87868 14.6213C6.75736 15.5 8.17157 15.5 11 15.5H19M19 15.5C17.8954 15.5 17 16.3954 17 17.5C17 18.6046 17.8954 19.5 19 19.5C20.1046 19.5 21 18.6046 21 17.5C21 16.3954 20.1046 15.5 19 15.5ZM11 19.5C9.89543 19.5 9 18.6046 9 17.5C9 16.3954 9.89543 15.5 11 15.5C12.1046 15.5 13 16.3954 13 17.5C13 18.6046 12.1046 19.5 11 19.5ZM5.5 6H16.3212C18.7766 6 20.0043 6 20.6741 6.76053C21.3439 7.52106 21.2124 8.72197 20.9494 11.1238L20.6021 13.6246C20.2901 16.3663 20.1341 17.7372 19.1716 18.6186C18.2091 19.5 16.7743 19.5 13.9046 19.5H12.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      color: '#c26eb4'
    },
    { 
      id: 'parking', 
      label: 'Parking',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 9C18 7.34315 16.6569 6 15 6H9V12H15C16.6569 12 18 10.6569 18 9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 22V2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#4a7fb8'
    },
    { 
      id: 'carwash', 
      label: 'Car Wash',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 14H17M5 18.5C5 19.8807 6.11929 21 7.5 21H16.5C17.8807 21 19 19.8807 19 18.5V15H5V18.5ZM19.2212 9.86447C19.6842 10.4097 20 11.1038 20 11.8859V13C20 13.5523 19.5523 14 19 14C18.4477 14 18 13.5523 18 13V11.8859C18 11.5904 17.8815 11.3079 17.6706 11.1023L16 9.5L14 7V4.5C14 3.67157 13.3284 3 12.5 3H11.5C10.6716 3 10 3.67157 10 4.5V7L8 9.5L6.32944 11.1023C6.11848 11.3079 6 11.5904 6 11.8859V13C6 13.5523 5.55228 14 5 14C4.44772 14 4 13.5523 4 13V11.8859C4 11.1038 4.31585 10.4097 4.77882 9.86447L7 7.5V4.5C7 2.01472 9.01472 0 11.5 0H12.5C14.9853 0 17 2.01472 17 4.5V7.5L19.2212 9.86447Z" fill="white"/>
        </svg>
      ),
      color: '#7e5fc2'
    }
  ];
  
  const recentSearches = [
    {
      id: 1,
      name: '10 Butchers Korean BBQ',
      address: '595 E El Camino Real, Sunnyvale, CA 94087'
    },
    {
      id: 2,
      name: 'Hyatt Place San Jose/Downtown',
      address: '282 S Almaden Blvd, San Jose, CA 95113'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      // Keep overlay open
    }
  };

  const handleCategoryClick = (category) => {
    onSearch(category.label);
    // Keep overlay open
  };

  const handleRecentClick = (place) => {
    onSearch(place.address);
    // Keep overlay open
  };

  const handleShortcutClick = (shortcut) => {
    onSearch(shortcut.label);
    // Keep overlay open
  };

  if (!isOpen) return null;

  return (
    <div className="map-search-overlay">
      <div className="search-overlay-content">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <svg className="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search maps"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="button" className="close-button" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          </div>
        </form>

        {/* Shortcuts: Home & Work */}
        <div className="shortcuts-container">
          {shortcuts.map((shortcut) => (
            <button
              key={shortcut.id}
              className="shortcut-button"
              onClick={() => handleShortcutClick(shortcut)}
            >
              <span className="shortcut-icon-svg">{shortcut.icon}</span>
              <span className="shortcut-label">{shortcut.label}</span>
            </button>
          ))}
        </div>

        {/* Search Nearby */}
        <div className="section">
          <h3 className="section-title">SEARCH NEARBY</h3>
          <div className="category-grid">
            {nearbyCategories.map((category) => (
              <button
                key={category.id}
                className="category-button"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="category-icon" style={{ backgroundColor: category.color }}>
                  {category.icon}
                </div>
                <span className="category-label">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        <div className="section">
          <h3 className="section-title">RECENT</h3>
          <div className="recent-list">
            {recentSearches.map((place) => (
              <button
                key={place.id}
                className="recent-item"
                onClick={() => handleRecentClick(place)}
              >
                <div className="recent-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="recent-content">
                  <div className="recent-name">{place.name}</div>
                  <div className="recent-address">{place.address}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapSearchOverlay;

