# HMI Prototype Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser Windows                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Cluster    │  │   Central    │  │  Passenger   │      │
│  │   Display    │  │   Display    │  │   Display    │      │
│  │  (React)     │  │   (React)    │  │   (React)    │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
│                   WebSocket Connection                       │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │
                             ▼
                ┌────────────────────────┐
                │   Backend Server       │
                │   (Node.js/Express)    │
                │   Socket.IO            │
                │                        │
                │   ┌────────────────┐   │
                │   │  Global State  │   │
                │   │    Manager     │   │
                │   └────────────────┘   │
                └────────────────────────┘
```

## Communication Flow

### 1. Display Registration
```
Display → Server: register('cluster' | 'central' | 'passenger')
Server → Display: state-update(currentState)
```

### 2. State Updates
```
Display A → Server: update-state({ volume: 75 })
Server: Merges update into global state
Server → All Displays: state-update(newState)
```

### 3. Actions
```
Display B → Server: action({ type: 'INCREMENT_VOLUME' })
Server: Processes action, updates state
Server → All Displays: state-update(newState)
```

## Component Architecture

### Frontend Structure

```
App (HMIProvider)
├── Router
│   ├── Home
│   │   └── Display selector with quick links
│   ├── ClusterDisplay
│   │   ├── Speedometer
│   │   ├── Vehicle Info
│   │   └── Media Status
│   ├── CentralDisplay
│   │   ├── Climate Control Tab
│   │   ├── Media Control Tab
│   │   └── Vehicle Info Tab
│   └── PassengerDisplay
│       ├── Entertainment Section
│       ├── Comfort Section
│       └── Info Section
```

### Context Architecture

```
HMIContext
├── socket (Socket.IO client)
├── connected (boolean)
├── state (global HMI state)
└── Methods:
    ├── registerDisplay(type)
    ├── updateState(updates)
    └── dispatchAction(action)
```

## State Management

### Global State Structure

```javascript
{
  // Climate Control
  temperature: number,      // Celsius
  fanSpeed: number,        // 0-4
  acMode: string,          // 'auto' | 'manual'
  
  // Media
  mediaPlaying: boolean,
  currentTrack: string,
  volume: number,          // 0-100
  
  // Navigation
  destination: string | null,
  eta: string | null,
  currentSpeed: number,    // km/h
  
  // Vehicle Info
  fuelLevel: number,       // 0-100
  range: number,           // km
  tripDistance: number,    // km
  
  // Display Settings
  brightness: number,      // 0-100
  theme: string           // 'dark' | 'light'
}
```

## WebSocket Events

### Client → Server

| Event | Payload | Description |
|-------|---------|-------------|
| `register` | `'cluster' \| 'central' \| 'passenger'` | Register display type |
| `update-state` | `Partial<State>` | Update specific state values |
| `action` | `{ type: string, payload?: any }` | Dispatch an action |

### Server → Client

| Event | Payload | Description |
|-------|---------|-------------|
| `state-update` | `State` | Complete current state |
| `connect` | - | Socket.IO built-in |
| `disconnect` | - | Socket.IO built-in |

## Action Types

| Action Type | Payload | Effect |
|-------------|---------|--------|
| `INCREMENT_VOLUME` | - | Increase volume by 5 (max 100) |
| `DECREMENT_VOLUME` | - | Decrease volume by 5 (min 0) |
| `TOGGLE_MEDIA` | - | Toggle play/pause |
| `INCREMENT_TEMP` | - | Increase temp by 0.5°C (max 30) |
| `DECREMENT_TEMP` | - | Decrease temp by 0.5°C (min 16) |
| `SET_FAN_SPEED` | `number (0-4)` | Set fan speed |
| `UPDATE_SPEED` | `number (0-240)` | Set vehicle speed |

## Data Flow Examples

### Example 1: Volume Change
```
1. User drags volume slider on Central Display
2. onChange handler calls: updateState({ volume: 75 })
3. Socket emits: 'update-state' with { volume: 75 }
4. Server receives, merges: hmiState.volume = 75
5. Server broadcasts: 'state-update' with full state
6. All displays receive update
7. React re-renders with new volume value
8. Cluster shows "Volume: 75%"
9. Passenger shows "Volume: 75%"
10. Central slider position updates
```

### Example 2: Temperature Control
```
1. User clicks + button on Central Display (Climate tab)
2. onClick calls: dispatchAction({ type: 'INCREMENT_TEMP' })
3. Socket emits: 'action' with action object
4. Server receives, processes in handleAction()
5. Server updates: hmiState.temperature += 0.5
6. Server broadcasts: 'state-update' with full state
7. All displays update temperature display
```

## Scalability Considerations

### Adding New Displays

1. Create new component extending base display pattern
2. Register with unique display type
3. Subscribe to relevant state updates
4. Implement display-specific UI

### Adding New Features

1. **Add State**: Update `hmiState` in server.js
2. **Add Actions**: Create action handlers if needed
3. **Update Frontend**: Add UI controls
4. **Dispatch Updates**: Use `updateState()` or `dispatchAction()`

### Performance Optimizations

- **State Granularity**: Only send changed values (optional enhancement)
- **Throttling**: Implement throttling for rapid updates (e.g., slider drag)
- **Selective Updates**: Target specific displays (optional enhancement)
- **Compression**: Use WebSocket compression for large payloads

## Security Considerations

### Current Implementation (Prototype)
- No authentication
- Local network only
- CORS open for development

### Production Recommendations
- Implement user authentication
- Add JWT tokens for WebSocket connections
- Enable HTTPS/WSS
- Add rate limiting
- Validate all client inputs
- Implement CORS restrictions
- Add logging and monitoring

## Extension Points

### 1. Custom Display Types
```javascript
// Easy to add new display types
socket.on('register', (displayType) => {
  if (connectedDisplays[displayType]) {
    connectedDisplays[displayType].push(socket.id);
  }
});
```

### 2. Plugin System (Future)
```javascript
// Potential plugin architecture
const plugins = [
  climateControlPlugin,
  mediaPlayerPlugin,
  navigationPlugin
];
```

### 3. Middleware (Future)
```javascript
// Add middleware for actions
function actionMiddleware(action) {
  // Logging, validation, analytics
  return processedAction;
}
```

## Testing Strategy

### Unit Tests
- State management functions
- Action handlers
- React component logic

### Integration Tests
- WebSocket connection
- State synchronization
- Multi-display updates

### E2E Tests
- User interactions
- Cross-display effects
- Real-time sync accuracy

## Deployment Architecture

### Development
```
Backend: localhost:3000
Frontend: localhost:5173 (Vite dev server)
```

### Production
```
Backend: Node.js server (PM2/Docker)
Frontend: Static hosting (CDN)
WebSocket: WSS with load balancing
```

## Technology Choices Rationale

| Technology | Reason |
|------------|--------|
| React | Component reusability, ecosystem |
| Socket.IO | Reliable WebSocket with fallbacks |
| Vite | Fast development, modern tooling |
| Express | Lightweight, flexible server |
| Context API | Simple state management, no redux needed |

## Future Enhancements

1. **State Persistence**: Save state to database
2. **Recording**: Record and replay sessions
3. **Analytics**: Track user interactions
4. **Themes**: Multiple theme support
5. **Gestures**: Touch and gesture controls
6. **Voice**: Voice command integration
7. **Mobile**: Native mobile app support
8. **Cloud Sync**: Multi-location testing

---

This architecture is designed to be **scalable**, **maintainable**, and **easy to extend** for rapid prototyping and user testing.

