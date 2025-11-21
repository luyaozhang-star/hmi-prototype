import { classNames } from '../../utils/classNames';
import './TextField.css';

/**
 * TextField Component
 * 
 * A text input component with label and validation states.
 * Supports error, success, and helper text.
 * 
 * @param {Object} props
 * @param {string} props.label - Input label
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.helperText - Helper text shown below input
 * @param {string} props.error - Error message (shows error state)
 * @param {boolean} props.success - Success state
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.readonly - Readonly state
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.type - Input type (text, email, password, etc.)
 */
const TextField = ({
  label,
  value,
  onChange,
  placeholder,
  helperText,
  error,
  success = false,
  disabled = false,
  readonly = false,
  className,
  type = 'text',
  ...rest
}) => {
  const hasError = Boolean(error);

  const containerClass = classNames(
    'ds-textfield',
    {
      'ds-textfield--error': hasError,
      'ds-textfield--success': success && !hasError,
      'ds-textfield--disabled': disabled,
      'ds-textfield--readonly': readonly,
    },
    className
  );

  const inputClass = classNames('ds-textfield__input');

  return (
    <div className={containerClass}>
      {label && (
        <label className="ds-textfield__label">
          {label}
        </label>
      )}
      <input
        className={inputClass}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        aria-invalid={hasError}
        aria-describedby={
          hasError ? 'error-text' : helperText ? 'helper-text' : undefined
        }
        {...rest}
      />
      {hasError && (
        <span className="ds-textfield__error-text" id="error-text">
          {error}
        </span>
      )}
      {!hasError && helperText && (
        <span className="ds-textfield__helper-text" id="helper-text">
          {helperText}
        </span>
      )}
    </div>
  );
};

export default TextField;

