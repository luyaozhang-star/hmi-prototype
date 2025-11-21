/**
 * Utility function to conditionally join classNames together
 * Similar to the popular 'classnames' npm package
 * 
 * @param {...(string|Object|Array)} args - Class names or objects with boolean values
 * @returns {string} Combined class names
 * 
 * @example
 * classNames('foo', 'bar'); // 'foo bar'
 * classNames('foo', { bar: true }); // 'foo bar'
 * classNames('foo', { bar: false }); // 'foo'
 * classNames('foo', ['bar', 'baz']); // 'foo bar baz'
 */
export const classNames = (...args) => {
  const classes = [];

  args.forEach(arg => {
    if (!arg) return;

    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      classes.push(classNames(...arg));
    } else if (argType === 'object') {
      Object.keys(arg).forEach(key => {
        if (arg[key]) {
          classes.push(key);
        }
      });
    }
  });

  return classes.join(' ');
};

export default classNames;

