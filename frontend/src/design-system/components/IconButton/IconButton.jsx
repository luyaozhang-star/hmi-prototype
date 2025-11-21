import { classNames } from '../../utils/classNames';
import './IconButton.css';

/**
 * IconButton Component
 * 
 * A button optimized for icon-only interactions.
 * Perfect for navigation controls and toolbar actions.
 * 
 * @param {Object} props
 * @param {ReactNode} props.icon - Icon element to display
 * @param {boolean} props.active - Whether button is in active state
 * @param {Function} props.onClick - Click handler
 * @param {string} props.label - Accessible label for screen readers
 * @param {'small' | 'large'} props.size - Button size (small = 64px, large = 96px)
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether button is disabled
 */
const IconButton = ({
  icon,
  active = false,
  onClick,
  label,
  size = 'small',
  className,
  disabled = false,
  ...rest
}) => {
  const buttonClass = classNames(
    'ds-icon-button',
    `ds-icon-button--${size}`,
    {
      'ds-icon-button--active': active,
      'ds-icon-button--disabled': disabled,
    },
    className
  );

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      type="button"
      aria-label={label}
      title={label}
      {...rest}
    >
      <span className="ds-icon-button__icon">{icon}</span>
    </button>
  );
};

export default IconButton;

