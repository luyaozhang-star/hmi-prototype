import { useHMI } from '../../contexts/HMIContext';
import './MediaApp.css';

function MediaApp() {
  const { state, dispatchAction, updateState } = useHMI();

  const handleVolumeChange = (increment) => {
    dispatchAction({
      type: increment ? 'INCREMENT_VOLUME' : 'DECREMENT_VOLUME'
    });
  };

  const handleToggleMedia = () => {
    dispatchAction({ type: 'TOGGLE_MEDIA' });
  };

  return (
    <div className="media-app">
      <div className="app-header">
        <h2>Media Player</h2>
        <p className="app-subtitle">Control your music and entertainment</p>
      </div>

      <div className="media-content">
        <div className="now-playing">
          <div className="album-art">🎵</div>
          <div className="track-info">
            <div className="track-name">{state.currentTrack}</div>
            <div className="artist-name">Artist Name</div>
            <div className="track-status">
              {state.mediaPlaying ? 'Now Playing' : 'Paused'}
            </div>
          </div>
        </div>

        <div className="playback-progress">
          <div className="progress-time">1:23</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '35%' }}></div>
          </div>
          <div className="progress-time">3:45</div>
        </div>

        <div className="media-controls">
          <button className="media-button secondary">⏮️</button>
          <button className="media-button play-button" onClick={handleToggleMedia}>
            {state.mediaPlaying ? '⏸️' : '▶️'}
          </button>
          <button className="media-button secondary">⏭️</button>
        </div>

        <div className="volume-control">
          <button
            className="volume-button"
            onClick={() => handleVolumeChange(false)}
          >
            🔉
          </button>
          <div className="volume-slider-container">
            <input
              type="range"
              min="0"
              max="100"
              value={state.volume}
              onChange={(e) => updateState({ volume: parseInt(e.target.value) })}
              className="volume-slider"
            />
            <div className="volume-value">{state.volume}%</div>
          </div>
          <button
            className="volume-button"
            onClick={() => handleVolumeChange(true)}
          >
            🔊
          </button>
        </div>

        <div className="playlist-section">
          <h3 className="playlist-title">Up Next</h3>
          <div className="playlist">
            <div className="playlist-item active">
              <span className="playlist-icon">🎵</span>
              <div className="playlist-info">
                <div className="playlist-track">Track 1</div>
                <div className="playlist-artist">Artist Name</div>
              </div>
              <span className="playlist-duration">3:45</span>
            </div>
            <div className="playlist-item">
              <span className="playlist-icon">🎵</span>
              <div className="playlist-info">
                <div className="playlist-track">Track 2</div>
                <div className="playlist-artist">Artist Name</div>
              </div>
              <span className="playlist-duration">4:12</span>
            </div>
            <div className="playlist-item">
              <span className="playlist-icon">🎵</span>
              <div className="playlist-info">
                <div className="playlist-track">Track 3</div>
                <div className="playlist-artist">Artist Name</div>
              </div>
              <span className="playlist-duration">3:28</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaApp;

