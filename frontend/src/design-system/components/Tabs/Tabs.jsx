import { classNames } from '../../utils/classNames';
import './Tabs.css';

/**
 * Tabs Component
 * 
 * A versatile tab navigation component for switching between views.
 * Designed for automotive HMI interfaces with touch-optimized sizing.
 * 
 * @param {Object} props
 * @param {Array<{id: string, label: string, icon?: ReactNode}>} props.tabs - Array of tab items
 * @param {string} props.activeTab - ID of the currently active tab
 * @param {Function} props.onChange - Callback when tab changes, receives tab id
 * @param {'pill' | 'underline'} props.variant - Visual variant of tabs
 * @param {'regular' | 'compact'} props.size - Tab size
 * @param {boolean} props.fullWidth - Whether tabs should stretch to fill container
 * @param {string} props.className - Additional CSS classes
 */
const Tabs = ({
  tabs = [],
  activeTab,
  onChange,
  variant = 'pill',
  size = 'regular',
  fullWidth = false,
  className,
  ...rest
}) => {
  const containerClass = classNames(
    'ds-tabs',
    `ds-tabs--${variant}`,
    `ds-tabs--${size}`,
    {
      'ds-tabs--full-width': fullWidth,
    },
    className
  );

  const handleTabClick = (tabId) => {
    if (onChange) {
      onChange(tabId);
    }
  };

  return (
    <nav className={containerClass} role="tablist" {...rest}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const tabClass = classNames(
          'ds-tabs__tab',
          {
            'ds-tabs__tab--active': isActive,
            'ds-tabs__tab--has-icon': !!tab.icon,
          }
        );

        return (
          <button
            key={tab.id}
            className={tabClass}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.icon && (
              <span className="ds-tabs__tab-icon">{tab.icon}</span>
            )}
            <span className="ds-tabs__tab-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Tabs;


