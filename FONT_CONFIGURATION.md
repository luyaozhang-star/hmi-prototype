# Font Configuration Summary

## ✅ Font Family Implementation

The HMI prototype is now fully configured to use the **TT Commons Pro** font family defined in the Design Tokens.

### Design Token Definition

**Location**: `/Design Tokens/01_Brand/Default.json`

```json
"fontFamily": {
  "hmi": {
    "value": "tt commons pro",
    "type": "fontFamilies"
  },
  "cluster": {
    "value": "tt commons pro mono",
    "type": "fontFamilies"
  }
}
```

### CSS Variables Generated

**Location**: `/frontend/src/styles/tokens/tokens.css`

```css
:root {
  --fontFamily-hmi: "TT Commons Pro", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  --fontFamily-cluster: "TT Commons Pro Mono", 'Courier New', 'Courier', monospace;
}
```

### Global Application

**Location**: `/frontend/src/styles/global.css`

```css
body {
  font-family: var(--fontFamily-hmi, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif);
}

button {
  font-family: inherit;
}
```

## 📍 Font Usage Across Components

### Inheritance Chain

1. **Body Element** → Uses `--fontFamily-hmi` with system font fallbacks
2. **All Components** → Inherit from body (no explicit font-family needed)
3. **Specific Components** → Can override with `--fontFamily-cluster` for monospace displays

### Components Using Design Token Font

✅ **StatusBar** (`/frontend/src/components/central/StatusBar.css`)
- User name: `var(--fontFamily-hmi)`
- Time/Weather: `var(--fontFamily-hmi)`
- Has @font-face declaration for TT Commons Pro

✅ **BottomNav** (`/frontend/src/components/central/BottomNav.css`)
- Temperature display: `var(--fontFamily-hmi)`

✅ **MapSearchOverlay** (`/frontend/src/components/central/MapSearchOverlay.jsx`)
- Inherits from body → uses `--fontFamily-hmi`
- All text elements (.recent-name, .category-label, etc.) inherit the font

✅ **NavigationApp** (`/frontend/src/components/central/NavigationApp.jsx`)
- Inherits from body → uses `--fontFamily-hmi`

✅ **All Other Components**
- Inherit from body element
- Automatically use TT Commons Pro via CSS cascade

## 🎨 Typography Classes

Typography classes are pre-configured in `/frontend/src/styles/tokens/typography.css`:

```css
.typography-typography-headline-large {
  font-family: var(--fontFamily-hmi);
  font-weight: var(--fontWeight-semibold);
  font-size: var(--fontSize-40);
  ...
}

.typography-typography-body-medium {
  font-family: var(--fontFamily-hmi);
  ...
}
```

## 🔄 Fallback Strategy

The font configuration uses a comprehensive fallback stack:

1. **Primary**: TT Commons Pro (custom brand font)
2. **System Fonts**: 
   - macOS/iOS: San Francisco (`-apple-system`)
   - Windows: Segoe UI
   - Android: Roboto
   - Ubuntu: Ubuntu font
3. **Generic**: sans-serif

This ensures the UI looks good even if the custom font fails to load.

## 📦 Font Loading

The font is loaded via @font-face in `StatusBar.css`:

```css
@font-face {
  font-family: 'TT Commons Pro';
  font-weight: 600;
  font-style: normal;
  /* Note: Add src: url() declarations to load actual font files */
}
```

### To Complete Font Setup

If you have TT Commons Pro font files (.woff2, .woff, .ttf), add them to `/frontend/public/fonts/` and update the @font-face declaration:

```css
@font-face {
  font-family: 'TT Commons Pro';
  src: url('/fonts/TTCommonsPro-Regular.woff2') format('woff2'),
       url('/fonts/TTCommonsPro-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'TT Commons Pro';
  src: url('/fonts/TTCommonsPro-SemiBold.woff2') format('woff2'),
       url('/fonts/TTCommonsPro-SemiBold.woff') format('woff');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
```

## ✨ Summary

✅ **Design tokens defined** in Brand folder  
✅ **CSS variables generated** automatically  
✅ **Global font applied** to body element  
✅ **All components use** design token font via inheritance  
✅ **Fallback stack configured** for reliability  
✅ **Typography classes** available for structured text styling

The entire project now uses the `fontFamily-hmi` design token (`TT Commons Pro`) with appropriate fallbacks!

