import { injectGlobal } from 'styled-components';
import { fontFace, normalize, rgba } from 'polished';

import colors from './colors';

export const foundation = {
  colors,
  fonts: {
    barlow: 'Barlow, sans-serif',
    din: 'urw-din, sans-serif',
    gotham: "'Gotham SSm A', 'Gotham SSm B', sans-serif",
    montserrat: 'Montserrat, sans-serif'
  },
  frame: {
    width: '1920px',
    height: '1080px'
  },
  shadows: [
    `0 1px 3px ${rgba(colors.gray[10], 0.12)}, 0 1px 2px ${rgba(
      colors.gray[10],
      0.24
    )}`,
    `0 3px 6px ${rgba(colors.gray[10], 0.16)}, 0 3px 6px ${rgba(
      colors.gray[10],
      0.23
    )}`,
    `0 10px 20px ${rgba(colors.gray[10], 0.19)}, 0 6px 6px ${rgba(
      colors.gray[10],
      0.23
    )}`,
    `0 14px 28px ${rgba(colors.gray[10], 0.25)}, 0 10px 10px ${rgba(
      colors.gray[10],
      0.22
    )}`,
    `0 19px 38px ${rgba(colors.gray[10], 0.3)}, 0 15px 12px ${rgba(
      colors.gray[10],
      0.22
    )}`
  ]
};

export default () => injectGlobal`
  ${normalize()}
`;
