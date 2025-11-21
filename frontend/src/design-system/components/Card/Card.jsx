import { classNames } from '../../utils/classNames';
import './Card.css';

/**
 * Card Component
 * 
 * A flexible container component for grouping related content.
 * Supports multiple variants and optional header/footer sections.
 * 
 * @param {Object} props
 * @param {'default' | 'elevated' | 'interactive'} props.variant - Card visual variant
 * @param {ReactNode} props.children - Card content
 * @param {ReactNode} props.header - Optional header content
 * @param {ReactNode} props.footer - Optional footer content
 * @param {Function} props.onClick - Optional click handler (makes card interactive)
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.compact - Use compact padding
 * @param {boolean} props.large - Use large padding
 */
const Card = ({
  variant = 'default',
  children,
  header,
  footer,
  onClick,
  className,
  compact = false,
  large = false,
  ...rest
}) => {
  const isInteractive = onClick || variant === 'interactive';
  
  const cardClass = classNames(
    'ds-card',
    `ds-card--${variant}`,
    {
      'ds-card--interactive': isInteractive,
      'ds-card--compact': compact,
      'ds-card--large': large,
    },
    className
  );

  const CardWrapper = isInteractive ? 'button' : 'div';

  return (
    <CardWrapper
      className={cardClass}
      onClick={onClick}
      type={isInteractive ? 'button' : undefined}
      {...rest}
    >
      {header && <div className="ds-card__header">{header}</div>}
      <div className="ds-card__body">{children}</div>
      {footer && <div className="ds-card__footer">{footer}</div>}
    </CardWrapper>
  );
};

export default Card;

