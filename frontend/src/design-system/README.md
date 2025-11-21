# HMI Design System

A comprehensive, reusable design system for the HMI (Human-Machine Interface) multi-display prototype. This design system provides a consistent set of UI components built with React, designed for automotive interfaces.

## Overview

This design system is built with future extraction and publishing in mind. All components are self-contained, use design tokens for theming, and have zero dependencies on app-specific code.

## Components

### Button
Multi-purpose button component with variants and sizes.
- Variants: `primary`, `secondary`, `tertiary`, `danger`, `icon`
- Sizes: `small`, `medium`, `large`
- States: default, hover, active, disabled, loading

### Card
Flexible card container for grouping content.
- Variants: `default`, `elevated`, `interactive`
- Supports header, body, and footer sections

### IconButton
Button optimized for icon-only interactions.
- Active state support
- Touch-optimized sizing for automotive use
- Accessible labels

### Typography
Consistent text rendering with semantic variants.
- Follows design token hierarchy
- Responsive sizing
- Support for all HTML heading and text elements

### Input Components
Form input components with consistent styling.
- TextField: Text input with labels and validation states
- Slider: Range input for numeric values

## Usage

```javascript
import { Button, Card, Typography } from '@/design-system';

function MyComponent() {
  return (
    <Card variant="elevated">
      <Typography variant="headline-medium">Welcome</Typography>
      <Button variant="primary" size="large" onClick={handleClick}>
        Get Started
      </Button>
    </Card>
  );
}
```

## Design Tokens

All components use design tokens from `src/tokens/designTokens.js` for:
- Colors (semantic and functional)
- Typography (sizes, weights, line heights)
- Spacing (consistent padding/margins)
- Border radius
- Shadows and elevations
- Motion (transitions and animations)

This ensures consistency and makes theming (light/dark mode) automatic.

## Accessibility

All components follow accessibility best practices:
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Sufficient color contrast
- Touch-optimized targets (44x44px minimum)
- Screen reader friendly

## Future Extraction as NPM Package

This design system is structured for easy extraction into a standalone npm package:

### Current Setup (Internal Use)
```javascript
import { Button } from '@/design-system';
```

### Future Package Setup
1. Move `/frontend/src/design-system/` to new repository
2. Add `package.json`:
```json
{
  "name": "@your-org/hmi-design-system",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "files": ["dist"],
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```
3. Add build configuration (Vite/Rollup for library mode)
4. Publish to npm
5. Install in projects: `npm install @your-org/hmi-design-system`

### Design Principles for Extraction

1. **Zero App Dependencies**: Components don't import from app code (contexts, utils, etc.)
2. **Self-Contained**: Each component folder has everything it needs
3. **Design Token Driven**: All styling via tokens, not hardcoded values
4. **Prop-Driven Behavior**: All customization through props
5. **Standard React Patterns**: Functional components, hooks, standard practices
6. **Clear Exports**: Single entry point via `index.js`

## Development

### Adding New Components

1. Create component folder in `design-system/components/`
2. Structure: `ComponentName/ComponentName.jsx`, `ComponentName.css`, `index.js`
3. Use design tokens exclusively for styling
4. Add comprehensive prop types
5. Export from main `design-system/index.js`
6. Add to showcase page with examples

### Testing Components

View all components in the showcase at `/design-system` route.

## Component Showcase

Access the interactive component showcase at `/design-system` to see:
- All component variants
- Interactive examples
- Code snippets
- Design token reference
- Theme switching

## Contributing

When adding or modifying components:
1. Follow existing component structure
2. Use design tokens only (no hardcoded values)
3. Ensure accessibility compliance
4. Add examples to showcase
5. Update this README with new components
6. Keep components app-agnostic

## License

Internal use for HMI Prototype. Update license before publishing as open source.

