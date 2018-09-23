import styled from 'styled-components';

const Base = styled.div`
  position: absolute;
  overflow: hidden;
  width: ${props => props.theme.frame.width};
  height: ${props => props.theme.frame.height};
`;

const Wrapper = styled(Base)`
  display: grid;
  grid-template-rows: repeat(26, 30px);
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
  z-index: 100;
`;

const InnerBorder = styled(Base)`
  box-shadow: inset 0 0 0 24px ${props => props.theme.colors.gray[2]};
  pointer-events: none;
  z-index: -1;
`;

const OuterBorder = styled(Base)`
  box-shadow: inset 0 0 0 12px ${props => props.theme.colors.gray[3]};
  pointer-events: none;
  z-index: 1000;
`;

export default {
  Base,
  InnerBorder,
  OuterBorder,
  Wrapper
};
