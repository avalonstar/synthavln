import { injectGlobal } from 'styled-components';
import { fontFace, normalize } from 'polished';

export default () => injectGlobal`
  ${normalize()}
`;
