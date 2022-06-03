import { css, Global } from '@emotion/react';
import colors, { getColor } from '@app-components/colors';
import normalizeCss from '@app-components/normalize-css';

/** Default styles for the project. */
const globalStyles = (
  <>
    {normalizeCss}
    {colors}
    <Global
      styles={css`
        html,
        body,
        #__next {
          font-family: Barlow, Segoe UI, Roboto, -apple-system, Oxygen, Ubuntu, sans-serif;
          height: 100%;
          margin: 0;
          padding: 0;
          background-color: ${getColor('primaryBackgroundColor')};
          color: ${getColor('primaryTextColor')};
        }
      `}
    />
  </>
);

export default globalStyles;
