/**
 * Values that can be use as a breakpoint, you can also use numbers to use a customer breakpoint.
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

/** Helper function to get media queries with the breakpoints. */
export const breakpoints = {
  keys: ['xs', 'sm', 'md', 'lg', 'xl'] as Breakpoint[],
  /**
   * Values for the breakpoints.
   * The breakpoint **start** at this value.
   * For instance with the first breakpoint xs: [xs, sm).
   */
  values: {
    /** Phone. */
    xs: 0,
    /** Tablet. */
    sm: 550,
    /** Small Laptop */
    md: 900,
    /** Desktop. */
    lg: 1200,
    /** Large Screen. */
    xl: 1536,
  },
  /**
   * Returns a media query string which matches screen widths greater than the screen size given by
   * the breakpoint key (inclusive).
   */
  up: (key: Breakpoint) => {
    const value = typeof key === 'string' ? breakpoints.values[key] : key;
    return `@media (min-width: ${value}px)`;
  },
  /**
   * Returns a media query string which matches screen widths less than the screen size given by the
   * breakpoint key (exclusive).
   */
  down: (key: Breakpoint) => {
    const value = typeof key === 'string' ? breakpoints.values[key] : key;
    return `@media (max-width:${value - 1}px)`;
  },
  /**
   * Returns a media query string which matches screen widths greater than the screen size given by
   * the breakpoint key in the first argument (inclusive) and less than the screen size given by the
   * breakpoint key in the second argument (exclusive).
   */
  between: (start: Breakpoint, end: Breakpoint) => {
    const startValue = typeof start === 'string' ? breakpoints.values[start] : start;
    const endValue = typeof end === 'string' ? breakpoints.values[end] : end;

    const startIndex = breakpoints.keys.indexOf(start);
    const endIndex = breakpoints.keys.indexOf(end);

    if (startIndex > endIndex) {
      throw new Error(
        `The start breakpoint (${start}) must be less than the end breakpoint (${end}).`,
      );
    }

    return `@media (min-width:${startValue}px) and ` + `(max-width:${endValue - 1}px)`;
  },
  /**
   * Returns a media query string which matches screen widths starting from the screen size given by
   * the breakpoint key (inclusive) and stopping at the screen size given by the next breakpoint
   * key (exclusive).
   */
  only: (key: Breakpoint) => {
    if (breakpoints.keys.indexOf(key) + 1 < breakpoints.keys.length) {
      return breakpoints.between(key, breakpoints.keys[breakpoints.keys.indexOf(key) + 1]);
    }

    return breakpoints.up(key);
  },
  /**
   * Returns a media query string which matches screen widths stopping at the screen size given by
   * the breakpoint key (exclusive) and starting at the screen size given by the next breakpoint
   * key (inclusive).
   */
  not: (key: Breakpoint) => {
    const keyIndex = breakpoints.keys.indexOf(key);

    if (keyIndex === 0) {
      return breakpoints.up(breakpoints.keys[1]);
    }
    if (keyIndex === breakpoints.keys.length - 1) {
      return breakpoints.down(breakpoints.keys[keyIndex]);
    }

    return breakpoints
      .between(key, breakpoints.keys[breakpoints.keys.indexOf(key) + 1])
      .replace('@media', '@media not all and');
  },
};
