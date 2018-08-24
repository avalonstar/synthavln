import { injectGlobal } from 'styled-components';
import { fontFace, normalize } from 'polished';

export const foundation = {};

export default () => injectGlobal`
  ${normalize()}
`;
