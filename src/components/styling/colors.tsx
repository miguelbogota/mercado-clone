import { css, Global } from '@emotion/react';
import { kebabCase } from 'lodash';

/**
 * Helper function which infers keys and restricts values to an array with the colors tu use.
 */
const asVariable = <T extends unknown>(obj: { [K in keyof T]: string }) => obj;

/** Union type with the allowed colors of the theme. */
export type ThemeColor = keyof typeof _colors;

/** Helper function to return the value of a variable to use in css. */
export const getColor = (colorName: ThemeColor) => `var(--${kebabCase(colorName)})`;

/** Variables for the colors to use in the project. */
const _colors = asVariable({
  primaryTextColor: '#333333',
  secondaryTextColor: '#999999',
  hintTextColor: '#dadada',
  primaryBackgroundColor: '#eeeeee',
  secondaryBackgroundColor: '#ffffff',
  primaryColor: '#ffe600',
  secondaryColor: '#3483fa',
  errorColor: '#bd3835',
});

/** Global variables using css. */
const colors = (
  <Global
    styles={css`
      :root {
        // Colors
        ${Object.entries(_colors)
          .map(([key, value]) => `--${kebabCase(key)}: ${value};`)
          .join('')}
      }
    `}
  />
);

export default colors;
