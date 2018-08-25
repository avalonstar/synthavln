import { injectGlobal } from 'styled-components';
import { normalize } from 'polished';

import colors from './colors';

export const foundation = {
  colors
};

export default () => injectGlobal`
  ${normalize()}
`;
