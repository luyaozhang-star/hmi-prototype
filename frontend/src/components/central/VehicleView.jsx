import './VehicleView.css';

function VehicleView() {
  const controlButtons = [
    { id: 'lock', icon: '🔒', label: 'Lock', position: 'top-center' },
    { id: 'frunk', icon: '📦', label: 'Frunk', position: 'top-left' },
    { id: 'trunk', icon: '🎒', label: 'Trunk', position: 'top-right' },
    { id: 'climate', icon: '❄️', label: 'Climate', position: 'bottom-left' },
    { id: 'charge', icon: '⚡', label: 'Charge', position: 'bottom-right' },
  ];

  const handleControlClick = (id) => {
    console.log(`Vehicle control clicked: ${id}`);
    // Handle control actions here
  };

  return (
    <div className="vehicle-view">
      {/* Vehicle Visualization */}
      <div className="vehicle-canvas">
        {/* Background gradient effect */}
        <div className="vehicle-backdrop"></div>
        
        {/* Vehicle Image */}
        <div className="vehicle-container">
          <img 
            src="/images/porsche-vehicle.png" 
            alt="Porsche Vehicle" 
            className="vehicle-image"
            onError={(e) => {
              // Fallback to a placeholder if image doesn't load
              e.target.style.display = 'none';
              console.log('Vehicle image not found. Please add porsche-vehicle.png to /frontend/public/images/');
            }}
          />
          
          {/* Glow effect */}
          <div className="vehicle-glow"></div>
        </div>
      </div>

      {/* Control Buttons Overlay */}
      <div className="vehicle-controls-overlay">
        {controlButtons.map(button => (
          <button
            key={button.id}
            className={`vehicle-control-btn ${button.position}`}
            onClick={() => handleControlClick(button.id)}
            title={button.label}
          >
            <span className="control-icon">{button.icon}</span>
            <span className="control-label">{button.label}</span>
          </button>
        ))}
      </div>

      {/* Vehicle Info Card */}
      <div className="vehicle-info-card">
        <div className="info-item">
          <span className="info-icon">🔋</span>
          <span className="info-text">85% Charged</span>
        </div>
        <div className="info-item">
          <span className="info-icon">🛣️</span>
          <span className="info-text">342 km Range</span>
        </div>
        <div className="info-item">
          <span className="info-icon">🔒</span>
          <span className="info-text">Locked</span>
        </div>
      </div>
    </div>
  );
}

export default VehicleView;
