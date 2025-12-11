import { classNames } from '../../utils/classNames';
import './Typography.css';

/**
 * Typography Component
 * 
 * Provides consistent text rendering with semantic variants based on design tokens.
 * Supports all typography hierarchy levels from display to body text.
 * 
 * @param {Object} props
 * @param {'display-xxlarge' | 'display-xlarge' | 'display-large' | 'display-medium' | 'display-small' | 
 *         'headline-large' | 'headline-medium' | 'headline-small' | 
 *         'body-large' | 'body-medium' | 'body-small' | 'body-tiny' | 
 *         'label-large' | 'label-medium' | 'label-small' | 'label-tiny'} props.variant - Typography variant
 * @param {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'} props.as - HTML element to render
 * @param {ReactNode} props.children - Text content
 * @param {string} props.className - Additional CSS classes
 * @param {'left' | 'center' | 'right'} props.align - Text alignment
 * @param {boolean} props.truncate - Enable text truncation with ellipsis
 */
const Typography = ({
  variant = 'body-medium',
  as = 'p',
  children,
  className,
  align,
  truncate = false,
  ...rest
}) => {
  const Component = as;

  const typographyClass = classNames(
    'ds-typography',
    `ds-typography--${variant}`,
    {
      [`ds-typography--align-${align}`]: align,
      'ds-typography--truncate': truncate,
    },
    className
  );

  return (
    <Component className={typographyClass} {...rest}>
      {children}
    </Component>
  );
};

export default Typography;

