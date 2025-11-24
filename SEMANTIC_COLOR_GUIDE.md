# Semantic Color Token Guide

## CRITICAL RULE: Always Use Semantic Tokens

**NEVER use brand tokens** like `--color-white-90-default`, `--color-black-10`, etc.  
**ALWAYS use semantic tokens** from the `03_Semantics` layer that adapt to themes.

---

## Typography & Text Colors

### Primary Text
```css
color: var(--onSurface-enabled);
```
Use for: Body text, headings, labels, primary content  
Replaces: `--color-white-90-default`, `--color-black-90-default`

### Secondary/Inactive Text
```css
color: var(--onSurface-inactive);
```
Use for: Helper text, captions, secondary information, placeholders  
Replaces: `--color-white-60-inactive`, `--color-black-60-inactive`

### Disabled Text
```css
color: var(--onSurface-disabled);
```
Use for: Disabled form labels, inactive UI text  
Replaces: `--color-white-30-disabled`, `--color-black-30-disabled`

### Text on Primary Surfaces
```css
color: var(--onSurface-primary-enabled);
```
Use for: Text on primary colored buttons/surfaces

---

## Background Colors

### Page Background
```css
background: var(--background-page);
```
Use for: Main page/application background  
Values: Black (#000000) in dark theme, White (#ffffff) in light theme

### UI Component Background
```css
background: var(--background-ui-primary);
```
Use for: Main UI container backgrounds

---

## Surface Colors (Backgrounds for Components)

### Primary Interactive Surfaces
```css
background: var(--surface-primary-enabled);
```
Use for: Primary buttons, active states, key interactive elements  
States: `--surface-primary-pressed`, `--surface-primary-disabled`, `--surface-primary-selected`

### Secondary Surfaces
```css
background: var(--surface-secondary-enabled);
```
Use for: Secondary buttons, input backgrounds, subtle containers  
Replaces: `--color-white-10`, `--color-black-10`  
States: `--surface-secondary-pressed`, `--surface-secondary-disabled`, `--surface-secondary-inactive`

### Tertiary Surfaces
```css
background: var(--surface-tertiary-enabled);
```
Use for: Cards, panels, subtle background elements  
Replaces: `--color-white-5`, `--color-white-3`, `--color-black-5`  
States: `--surface-tertiary-pressed`, `--surface-tertiary-disabled`, `--surface-tertiary-inactive`

---

## Borders & Dividers

### Dividers
```css
border: 1px solid var(--elements-divider);
```
Use for: Borders, dividers, separators  
Replaces: `--color-white-10`, `--color-black-10`

---

## Functional Colors

### Warning/Error States
```css
/* Surface */
background: var(--surface-functional-warning);
border-color: var(--surface-functional-warning);

/* Text */
color: var(--onSurface-functional-warning);
```
Use for: Error messages, destructive actions, warnings

### Positive/Success States
```css
/* Surface */
background: var(--surface-functional-positive);
border-color: var(--surface-functional-positive);

/* Text */
color: var(--onSurface-functional-positive);
```
Use for: Success messages, confirmations, positive feedback

### Caution States
```css
/* Surface */
background: var(--surface-functional-caution);

/* Text */
color: var(--onSurface-functional-caution);
```
Use for: Caution notices, important information

### Informational
```css
background: var(--surface-functional-informational);
```
Use for: Info messages, neutral notifications

---

## Common Component Patterns

### Button
```css
.button {
  background: var(--surface-primary-enabled);
  color: var(--onSurface-primary-enabled);
  border: 1px solid var(--surface-primary-enabled);
}

.button:hover {
  background: var(--surface-primary-pressed);
}

.button:disabled {
  background: var(--surface-primary-disabled);
  color: var(--onSurface-disabled);
}
```

### Card
```css
.card {
  background: var(--surface-tertiary-enabled);
  border: 1px solid var(--elements-divider);
  color: var(--onSurface-enabled);
}

.card:hover {
  background: var(--surface-secondary-enabled);
}
```

### Input Field
```css
.input {
  background: var(--surface-tertiary-enabled);
  border: 1px solid var(--elements-divider);
  color: var(--onSurface-enabled);
}

.input::placeholder {
  color: var(--onSurface-inactive);
}

.input:focus {
  border-color: var(--surface-primary-enabled);
}

.input:disabled {
  background: var(--surface-tertiary-disabled);
  color: var(--onSurface-disabled);
}
```

### Typography
```css
.text-primary {
  color: var(--onSurface-enabled);
}

.text-secondary {
  color: var(--onSurface-inactive);
}

.text-disabled {
  color: var(--onSurface-disabled);
}
```

---

## Migration Examples

### ❌ WRONG (Brand Tokens)
```css
color: var(--color-white-90-default);
background: var(--color-white-10);
border: 1px solid var(--color-white-20);
```

### ✅ CORRECT (Semantic Tokens)
```css
color: var(--onSurface-enabled);
background: var(--surface-secondary-enabled);
border: 1px solid var(--elements-divider);
```

---

## Why Semantic Tokens?

1. **Theme Support**: Semantic tokens automatically adapt to dark/light themes
2. **Consistency**: Ensures UI components look cohesive across the application
3. **Maintainability**: Changes to theme colors only require updating semantic token definitions
4. **Accessibility**: Semantic tokens maintain proper contrast ratios in all themes
5. **Intent**: Token names describe purpose, making code more readable

---

## Quick Reference Table

| Old Brand Token | New Semantic Token | Use Case |
|----------------|-------------------|----------|
| `--color-white-90-default` | `--onSurface-enabled` | Primary text |
| `--color-white-60-inactive` | `--onSurface-inactive` | Secondary text |
| `--color-white-30-disabled` | `--onSurface-disabled` | Disabled text |
| `--color-white-10` | `--surface-secondary-enabled` or `--elements-divider` | Backgrounds/borders |
| `--color-white-5` | `--surface-tertiary-enabled` | Subtle backgrounds |
| `--color-white-100-primary` | `--onSurface-enabled` | Text on surfaces |
| `--color-black-100-primary` | `--background-page` (light theme) | Page background |

---

## Testing Your Changes

After updating to semantic tokens:

1. Test in **dark theme** (default)
2. Test in **light theme** (toggle in Design System Showcase)
3. Verify all text is readable with proper contrast
4. Check that interactive states (hover, focus, disabled) work correctly
5. Ensure functional colors (error, success) are visible in both themes

---

For more details, see:
- `DESIGN_TOKENS_GUIDE.md` - Complete design token documentation
- `Design Tokens/03_Semantics/` - Semantic token definitions
- `.cursorrules` - Project coding standards


