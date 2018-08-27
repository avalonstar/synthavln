import styled from 'styled-components';
// import { rgba } from 'polished';

const Base = styled.div`
  position: absolute;
  overflow: hidden;
  width: ${props => props.theme.frame.width};
  height: ${props => props.theme.frame.height};
`;

const Wrapper = styled(Base)`
  display: grid;
  grid-template-rows: repeat(26, 30px);
  grid-gap: 12px;
`;

const Border = styled(Base)`
  box-shadow: inset 0 0 0 12px ${props => props.theme.colors.gray[3]},
    inset 0 0 0 24px ${props => props.theme.colors.gray[2]};
  z-index: 1000;
`;

const Container = styled.div``;

export default {
  Border,
  Container,
  Wrapper
};
