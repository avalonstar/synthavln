import { injectGlobal } from 'styled-components';
import { normalize } from 'polished';

import colors from './colors';

export const foundation = {
  colors,
  fonts: {
    montserrat: "'Montserrat', sans-serif"
  }
};

export default () => injectGlobal`
  ${normalize()}
`;
