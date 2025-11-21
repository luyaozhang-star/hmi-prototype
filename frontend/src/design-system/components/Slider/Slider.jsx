import { classNames } from '../../utils/classNames';
import './Slider.css';

/**
 * Slider Component
 * 
 * A range input slider for numeric values.
 * Perfect for temperature, volume, and other continuous value controls.
 * 
 * @param {Object} props
 * @param {string} props.label - Slider label
 * @param {number} props.value - Current value
 * @param {Function} props.onChange - Change handler
 * @param {number} props.min - Minimum value
 * @param {number} props.max - Maximum value
 * @param {number} props.step - Step increment
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.formatValue - Function to format displayed value
 * @param {boolean} props.showValue - Whether to show current value
 */
const Slider = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className,
  formatValue = (val) => val,
  showValue = true,
  ...rest
}) => {
  const containerClass = classNames(
    'ds-slider',
    {
      'ds-slider--disabled': disabled,
    },
    className
  );

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={containerClass}>
      {(label || showValue) && (
        <div className="ds-slider__header">
          {label && <label className="ds-slider__label">{label}</label>}
          {showValue && (
            <span className="ds-slider__value">{formatValue(value)}</span>
          )}
        </div>
      )}
      <div className="ds-slider__track-container">
        <input
          type="range"
          className="ds-slider__input"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          style={{
            '--slider-percentage': `${percentage}%`,
          }}
          {...rest}
        />
        <div className="ds-slider__track">
          <div
            className="ds-slider__track-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div
          className="ds-slider__thumb"
          style={{ left: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Slider;

