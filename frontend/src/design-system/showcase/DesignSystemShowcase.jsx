import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { IconButton } from '../components/IconButton';
import { Typography } from '../components/Typography';
import { TextField } from '../components/TextField';
import { Slider } from '../components/Slider';
import './DesignSystemShowcase.css';

const DesignSystemShowcase = () => {
  const navigate = useNavigate();
  const [textValue, setTextValue] = useState('');
  const [sliderValue, setSliderValue] = useState(70);
  const [errorText, setErrorText] = useState('');

  // Sample icon for demonstrations
  const SampleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const HomeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  );

  return (
    <div className="ds-showcase">
      {/* Header */}
      <header className="ds-showcase__header">
        <div className="ds-showcase__header-content">
          <div className="ds-showcase__header-left">
            <IconButton
              icon={<HomeIcon />}
              label="Back to Home"
              onClick={() => navigate('/')}
            />
            <div>
              <Typography variant="headline-large" as="h1">
                HMI Design System
              </Typography>
              <Typography variant="body-small" className="ds-showcase__subtitle">
                Reusable component library for automotive interfaces
              </Typography>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="ds-showcase__content">
        {/* Introduction */}
        <section className="ds-showcase__section">
          <Card>
            <Typography variant="headline-medium" as="h2">
              Welcome to the Design System
            </Typography>
            <Typography variant="body-small">
              This is a comprehensive showcase of all reusable UI components in the HMI prototype.
              All components are built with design tokens, ensuring consistency and easy theming.
            </Typography>
          </Card>
        </section>

        {/* Typography Section */}
        <section className="ds-showcase__section">
          <Typography variant="headline-medium" as="h2" className="ds-showcase__section-title">
            Typography
          </Typography>
          <Card>
            <div className="ds-showcase__typography-grid">
              <div>
                <Typography variant="display-large" as="h1">Display Large</Typography>
                <Typography variant="body-tiny" className="ds-showcase__variant-specs">
                  48px / 106px / -0.5px / Mono
                </Typography>
              </div>
              <div>
                <Typography variant="display-medium" as="h1">Display Medium</Typography>
                <Typography variant="body-tiny" className="ds-showcase__variant-specs">
                  40px / 72px / -0.5px / Mono
                </Typography>
              </div>
              <div>
                <Typography variant="display-small" as="h1">Display Small</Typography>
                <Typography variant="body-tiny" className="ds-showcase__variant-specs">
                  32px / 56px / -0.5px / Mono
                </Typography>
              </div>
              <div>
                <Typography variant="headline-large" as="h2">Headline Large</Typography>
                <Typography variant="body-tiny" className="ds-showcase__variant-specs">
                  40px / 48px / -0.5px / Semibold
                </Typography>
              </div>
              <div>
                <Typography variant="headline-medium" as="h2">Headline Medium</Typography>
                <Typography variant="body-tiny" className="ds-showcase__variant-specs">
                  32px / 36px / -0.5px / Semibold
                </Typography>
              </div>
              <div>
                <Typography variant="headline-small" as="h3">Headline Small</Typography>
                <Typography variant="body-tiny" className="ds-showcase__variant-specs">
                  24px / 28px / -0.5px / Semibold
                </Typography>
              </div>
              <div>
                <Typography variant="body-large" as="p">Body Large</Typography>
                <Typography variant="body-tiny" className="ds-showcase__variant-specs">
                  36px / 44px / -0.5px / Semibold
                </Typography>
              </div>
              <div>
                <Typography variant="body-medium" as="p">Body Medium</Typography>
                <Typography variant="body-tiny" className="ds-showcase__variant-specs">
                  24px / 32px / 0px / Semibold
                </Typography>
              </div>
              <div>
                <Typography variant="body-small" as="p">Body Small</Typography>
                <Typography variant="body-tiny" className="ds-showcase__variant-specs">
                  20px / 28px / 0px / Semibold
                </Typography>
              </div>
              <div>
                <Typography variant="body-tiny" as="p">Body Tiny</Typography>
                <Typography variant="body-tiny" className="ds-showcase__variant-specs">
                  16px / 24px / -0.5px / Semibold
                </Typography>
              </div>
              <div>
                <Typography variant="label-large" as="p">Label Large</Typography>
                <Typography variant="body-tiny" className="ds-showcase__variant-specs">
                  32px / 40px / -0.5px / Semibold
                </Typography>
              </div>
              <div>
                <Typography variant="label-medium" as="p">Label Medium</Typography>
                <Typography variant="body-tiny" className="ds-showcase__variant-specs">
                  24px / 32px / 0px / Medium
                </Typography>
              </div>
              <div>
                <Typography variant="label-small" as="p">Label Small</Typography>
                <Typography variant="body-tiny" className="ds-showcase__variant-specs">
                  20px / 28px / 0px / Semibold
                </Typography>
              </div>
            </div>
          </Card>
        </section>

        {/* Button Section */}
        <section className="ds-showcase__section">
          <Typography variant="headline-medium" as="h2" className="ds-showcase__section-title">
            Buttons
          </Typography>
          
          {/* Button Variants */}
          <Card>
            <Typography variant="headline-small" as="h3" className="ds-showcase__subsection-title">
              Variants
            </Typography>
            <div className="ds-showcase__button-grid">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </Card>

          {/* Button Sizes */}
          <Card>
            <Typography variant="headline-small" as="h3" className="ds-showcase__subsection-title">
              Sizes
            </Typography>
            <div className="ds-showcase__button-grid">
              <Button size="small">Regular (64px)</Button>
              <Button size="large">Large (96px)</Button>
            </div>
          </Card>

          {/* Button States */}
          <Card>
            <Typography variant="headline-small" as="h3" className="ds-showcase__subsection-title">
              States
            </Typography>
            <div className="ds-showcase__button-grid">
              <Button>Default</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
          </Card>

          {/* Buttons with Icons */}
          <Card>
            <Typography variant="headline-small" as="h3" className="ds-showcase__subsection-title">
              With Icons
            </Typography>
            <div className="ds-showcase__button-grid">
              <Button icon={<SampleIcon />} iconPosition="left">
                Icon Left
              </Button>
              <Button icon={<SampleIcon />} iconPosition="right">
                Icon Right
              </Button>
              <Button icon={<SampleIcon />} />
            </div>
          </Card>
        </section>

        {/* IconButton Section */}
        <section className="ds-showcase__section">
          <Typography variant="headline-medium" as="h2" className="ds-showcase__section-title">
            Icon Buttons
          </Typography>
          <Card>
            <Typography variant="headline-small" as="h3" className="ds-showcase__subsection-title">
              Sizes & States
            </Typography>
            <div className="ds-showcase__icon-button-grid">
              <div>
                <IconButton icon={<HomeIcon />} size="small" label="Regular" />
                <Typography variant="body-tiny">Regular (64px)</Typography>
              </div>
              <div>
                <IconButton icon={<HomeIcon />} size="large" label="Large" />
                <Typography variant="body-tiny">Large (96px)</Typography>
              </div>
              <div>
                <IconButton icon={<HomeIcon />} active label="Active" />
                <Typography variant="body-tiny">Active</Typography>
              </div>
              <div>
                <IconButton icon={<HomeIcon />} disabled label="Disabled" />
                <Typography variant="body-tiny">Disabled</Typography>
              </div>
            </div>
          </Card>
        </section>

        {/* Card Section */}
        <section className="ds-showcase__section">
          <Typography variant="headline-medium" as="h2" className="ds-showcase__section-title">
            Cards
          </Typography>
          
          <div className="ds-showcase__card-grid">
            <Card variant="default">
              <Typography variant="headline-small">Default Card</Typography>
              <Typography variant="body-small">
                This is a default card with standard styling.
              </Typography>
            </Card>

            <Card variant="elevated">
              <Typography variant="headline-small">Elevated Card</Typography>
              <Typography variant="body-small">
                This card has an elevated shadow effect.
              </Typography>
            </Card>

            <Card
              variant="interactive"
              onClick={() => alert('Card clicked!')}
            >
              <Typography variant="headline-small">Interactive Card</Typography>
              <Typography variant="body-small">
                Click me! This card responds to interactions.
              </Typography>
            </Card>
          </div>

          <Card
            header={<Typography variant="headline-small">Card with Header</Typography>}
            footer={<Typography variant="body-tiny">Footer content here</Typography>}
          >
            <Typography variant="body-small">
              This card demonstrates header, body, and footer sections.
            </Typography>
          </Card>
        </section>

        {/* TextField Section */}
        <section className="ds-showcase__section">
          <Typography variant="headline-medium" as="h2" className="ds-showcase__section-title">
            Text Fields
          </Typography>
          
          <Card>
            <div className="ds-showcase__textfield-grid">
              <TextField
                label="Default Input"
                placeholder="Enter text..."
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                helperText="This is helper text"
              />

              <TextField
                label="With Error"
                placeholder="Enter text..."
                value={errorText}
                onChange={(e) => setErrorText(e.target.value)}
                error="This field is required"
              />

              <TextField
                label="Success State"
                placeholder="Enter text..."
                value="Valid input"
                success
                helperText="Looks good!"
              />

              <TextField
                label="Disabled Input"
                value="Disabled"
                disabled
              />

              <TextField
                label="Readonly Input"
                value="Read-only value"
                readonly
              />
            </div>
          </Card>
        </section>

        {/* Slider Section */}
        <section className="ds-showcase__section">
          <Typography variant="headline-medium" as="h2" className="ds-showcase__section-title">
            Sliders
          </Typography>
          
          <Card>
            <div className="ds-showcase__slider-grid">
              <Slider
                label="Temperature"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                min={60}
                max={85}
                formatValue={(val) => `${val}°F`}
              />

              <Slider
                label="Volume"
                value={50}
                onChange={() => {}}
                min={0}
                max={100}
                formatValue={(val) => `${val}%`}
              />

              <Slider
                label="Disabled Slider"
                value={30}
                onChange={() => {}}
                disabled
              />
            </div>
          </Card>
        </section>

        {/* Design Tokens Section */}
        <section className="ds-showcase__section">
          <Typography variant="headline-medium" as="h2" className="ds-showcase__section-title">
            Design Tokens
          </Typography>
          
          <Card>
            <Typography variant="headline-small" as="h3" className="ds-showcase__subsection-title">
              Colors
            </Typography>
            <div className="ds-showcase__color-grid">
              <div className="ds-showcase__color-swatch" style={{ background: 'var(--surface-primary-enabled)' }}>
                <Typography variant="body-tiny">Primary</Typography>
              </div>
              <div className="ds-showcase__color-swatch" style={{ background: 'var(--color-functional-warning)' }}>
                <Typography variant="body-tiny">Warning</Typography>
              </div>
              <div className="ds-showcase__color-swatch" style={{ background: 'var(--color-functional-positive)' }}>
                <Typography variant="body-tiny">Positive</Typography>
              </div>
              <div className="ds-showcase__color-swatch" style={{ background: 'var(--color-functional-caution)' }}>
                <Typography variant="body-tiny">Caution</Typography>
              </div>
              <div className="ds-showcase__color-swatch" style={{ background: 'var(--color-white-10)' }}>
                <Typography variant="body-tiny">Surface</Typography>
              </div>
            </div>
          </Card>

          <Card>
            <Typography variant="headline-small" as="h3" className="ds-showcase__subsection-title">
              Spacing Scale
            </Typography>
            <div className="ds-showcase__spacing-grid">
              <div><div className="ds-showcase__spacing-box" style={{ width: 'var(--spacing-8)' }}/><Typography variant="body-tiny">8px</Typography></div>
              <div><div className="ds-showcase__spacing-box" style={{ width: 'var(--spacing-12)' }}/><Typography variant="body-tiny">12px</Typography></div>
              <div><div className="ds-showcase__spacing-box" style={{ width: 'var(--spacing-16)' }}/><Typography variant="body-tiny">16px</Typography></div>
              <div><div className="ds-showcase__spacing-box" style={{ width: 'var(--spacing-24)' }}/><Typography variant="body-tiny">24px</Typography></div>
              <div><div className="ds-showcase__spacing-box" style={{ width: 'var(--spacing-32)' }}/><Typography variant="body-tiny">32px</Typography></div>
              <div><div className="ds-showcase__spacing-box" style={{ width: 'var(--spacing-48)' }}/><Typography variant="body-tiny">48px</Typography></div>
            </div>
          </Card>
        </section>

        {/* Usage Examples */}
        <section className="ds-showcase__section">
          <Typography variant="headline-medium" as="h2" className="ds-showcase__section-title">
            Usage Examples
          </Typography>
          
          <Card>
            <Typography variant="headline-small" as="h3" className="ds-showcase__subsection-title">
              Import Components
            </Typography>
            <pre className="ds-showcase__code">
              <code>{`import { Button, Card, Typography } from '@/design-system';

function MyComponent() {
  return (
    <Card variant="elevated">
      <Typography variant="headline-medium">
        Welcome
      </Typography>
      <Button variant="primary" size="large">
        Get Started
      </Button>
    </Card>
  );
}`}</code>
            </pre>
          </Card>
        </section>

        {/* Footer */}
        <section className="ds-showcase__footer">
          <Card>
            <Typography variant="body-small" align="center">
              All components use design tokens and support light/dark themes.
              See <code>README.md</code> for full documentation.
            </Typography>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default DesignSystemShowcase;

