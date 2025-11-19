# Component Update Example: Using Design Tokens

This guide shows how to update existing components to use design tokens instead of hardcoded values.

## Before and After Example

### ❌ Before: Hardcoded Values

```jsx
// StatusBar.jsx
import './StatusBar.css';

function StatusBar() {
  return (
    <div className="status-bar">
      <div className="time" style={{ fontSize: '18px', color: '#fff' }}>
        12:30 PM
      </div>
    </div>
  );
}

// StatusBar.css
.status-bar {
  background: rgba(255, 255, 255, 0.05);
  padding: 12px 24px;
  border-radius: 8px;
}

.time {
  font-size: 18px;
  color: #ffffff;
  font-weight: 600;
}
```

### ✅ After: Using Design Tokens

```jsx
// StatusBar.jsx
import './StatusBar.css';
import { useDesignTokens } from '../../hooks/useDesignTokens';

function StatusBar() {
  const tokens = useDesignTokens();
  
  return (
    <div className="status-bar">
      <div className="time typography-body-small">
        12:30 PM
      </div>
    </div>
  );
}

// StatusBar.css
.status-bar {
  background: var(--surface-secondary-enabled);
  padding: var(--spacing-12) var(--spacing-24);
  border-radius: var(--borderRadius-8);
}

.time {
  color: var(--onSurface-onSurface-enabled);
}
```

## Step-by-Step Update Process

### Step 1: Identify Hardcoded Values

Look for:
- ✅ Hardcoded colors (`#ffffff`, `rgba(...)`)
- ✅ Fixed sizes (`16px`, `24px`)
- ✅ Font properties (`font-size`, `font-weight`, `font-family`)
- ✅ Spacing values (`padding`, `margin`, `gap`)
- ✅ Border radius, opacity, etc.

### Step 2: Find Equivalent Tokens

Use the Design Token Guide to find matching tokens:

| Hardcoded Value | Design Token |
|----------------|--------------|
| `#ffffff` | `var(--color-white-100-primary)` |
| `rgba(255,255,255,0.9)` | `var(--color-white-90-default)` |
| `rgba(255,255,255,0.05)` | `var(--color-white-5)` |
| `#2196F3` | `var(--surface-primary-enabled)` |
| `16px` (padding/margin) | `var(--spacing-16)` |
| `24px` (font-size) | `var(--fontSize-24)` |
| `8px` (border-radius) | `var(--borderRadius-8)` |
| `font-weight: 600` | `var(--fontWeight-semibold)` |

### Step 3: Replace Inline Styles

```jsx
// Before
<div style={{ 
  color: '#fff', 
  fontSize: '24px',
  padding: '16px'
}}>
  Content
</div>

// After - Option 1: CSS Variables
<div style={{ 
  color: 'var(--onSurface-onSurface-enabled)', 
  fontSize: 'var(--fontSize-24)',
  padding: 'var(--spacing-16)'
}}>
  Content
</div>

// After - Option 2: Typography Classes
<div className="typography-body-medium" style={{
  padding: 'var(--spacing-16)'
}}>
  Content
</div>

// After - Option 3: React Hook
const tokens = useDesignTokens();
<div style={{ 
  color: tokens.getCSSVar('onSurface-onSurface-enabled'), 
  fontSize: tokens.getCSSVar('fontSize-24'),
  padding: tokens.getCSSVar('spacing-16')
}}>
  Content
</div>
```

### Step 4: Update CSS Files

```css
/* Before */
.my-component {
  background: #1a1a1a;
  color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
}

/* After */
.my-component {
  background: var(--surface-secondary-enabled);
  color: var(--onSurface-onSurface-enabled);
  padding: var(--spacing-20);
  border-radius: var(--borderRadius-8);
  font-size: var(--fontSize-16);
  font-weight: var(--fontWeight-semibold);
}

/* Or use typography class */
.my-component {
  background: var(--surface-secondary-enabled);
  padding: var(--spacing-20);
  border-radius: var(--borderRadius-8);
  /* Apply typography via className instead */
}
```

## Common Patterns

### Pattern 1: Button Styles

```css
/* Before */
.button {
  background: #2196F3;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
}

.button:hover {
  background: #1976D2;
}

.button:disabled {
  background: #666;
  color: #999;
  opacity: 0.5;
}

/* After */
.button {
  background: var(--surface-primary-enabled);
  color: var(--onSurface-onSurface-primary-enabled);
  padding: var(--spacing-12) var(--spacing-24);
  border-radius: var(--borderRadius-8);
  font-size: var(--fontSize-16);
  font-weight: var(--fontWeight-semibold);
}

.button:hover {
  background: var(--surface-primary-pressed);
}

.button:disabled {
  background: var(--surface-primary-disabled);
  color: var(--onSurface-onSurface-primary-disabled);
  opacity: var(--opacity-disabled);
}
```

### Pattern 2: Card Component

```css
/* Before */
.card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
}

/* After */
.card {
  background: var(--surface-secondary-enabled);
  backdrop-filter: var(--backdropFilter-backdrop-medium);
  border: 1px solid var(--elements-divider);
  border-radius: var(--radius-radius-container);
  padding: var(--spacing-24);
}
```

### Pattern 3: Text Hierarchy

```jsx
// Before
<div>
  <h1 style={{ fontSize: '48px', fontWeight: 700 }}>Title</h1>
  <h2 style={{ fontSize: '32px', fontWeight: 600 }}>Subtitle</h2>
  <p style={{ fontSize: '16px', fontWeight: 400 }}>Body text</p>
</div>

// After
<div>
  <h1 className="typography-display-large">Title</h1>
  <h2 className="typography-headline-medium">Subtitle</h2>
  <p className="typography-body-small">Body text</p>
</div>
```

### Pattern 4: Functional Colors

```css
/* Before */
.warning { color: #ef5350; }
.success { color: #4caf50; }
.info { color: #2196f3; }
.caution { color: #ff9800; }

/* After */
.warning { color: var(--color-functional-warning); }
.success { color: var(--color-functional-positive); }
.info { color: var(--color-functional-informative); }
.caution { color: var(--color-functional-caution); }
```

## Interactive State Pattern

```css
/* Before */
.interactive-element {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  opacity: 1;
}

.interactive-element:hover {
  background: rgba(255, 255, 255, 0.15);
  opacity: 0.88;
}

.interactive-element:active {
  background: rgba(33, 150, 243, 0.5);
}

.interactive-element.inactive {
  opacity: 0.6;
}

.interactive-element:disabled {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.3);
  opacity: 0.5;
}

/* After */
.interactive-element {
  background: var(--surface-secondary-enabled);
  color: var(--onSurface-onSurface-enabled);
  opacity: var(--opacity-active);
}

.interactive-element:hover {
  background: var(--surface-secondary-pressed);
  opacity: var(--opacity-hover);
}

.interactive-element:active {
  background: var(--surface-primary-pressed);
}

.interactive-element.inactive {
  background: var(--surface-secondary-inactive);
  color: var(--onSurface-onSurface-inactive);
  opacity: var(--opacity-inactive);
}

.interactive-element:disabled {
  background: var(--surface-secondary-disabled);
  color: var(--onSurface-onSurface-disabled);
  opacity: var(--opacity-disabled);
}
```

## Migration Checklist

For each component:

- [ ] Review all CSS files for hardcoded values
- [ ] Replace color values with semantic tokens
- [ ] Replace spacing with spacing tokens
- [ ] Replace font properties with typography tokens or classes
- [ ] Replace border-radius with radius tokens
- [ ] Replace opacity values with opacity tokens
- [ ] Update inline styles in JSX
- [ ] Test in dark theme (default)
- [ ] Test in light theme (if applicable)
- [ ] Verify responsive behavior
- [ ] Check accessibility (contrast ratios maintained)

## Testing Your Updates

1. **Visual Testing**: Check that components look correct
2. **Theme Testing**: Toggle between dark/light themes
3. **Interactive Testing**: Hover, active, disabled states work correctly
4. **Responsive Testing**: Components adapt to different screen sizes
5. **Token Testing**: Use the token explorer to verify values

```jsx
// Token Explorer Component (for testing)
import { useDesignTokens } from './hooks/useDesignTokens';

function TokenExplorer() {
  const tokens = useDesignTokens();
  const colors = tokens.getColors();
  
  return (
    <div>
      <h2>Available Colors</h2>
      {Object.entries(colors).map(([name, value]) => (
        <div key={name} style={{ 
          background: value, 
          padding: 'var(--spacing-8)'
        }}>
          {name}: {value}
        </div>
      ))}
    </div>
  );
}
```

## Benefits of Using Design Tokens

✅ **Consistency**: Unified design language across all components  
✅ **Themability**: Easy light/dark mode switching  
✅ **Maintainability**: Change tokens in one place, update everywhere  
✅ **Scalability**: Add new themes without modifying components  
✅ **Accessibility**: Maintain proper contrast ratios  
✅ **Design-Dev Sync**: Tokens sync with Figma designs  

---

**Ready to update your components? Start with the most-used components first!** 🚀

