import React from 'react';
import PropTypes from 'prop-types';

import { Header, Notifier } from 'components';

import styled from 'styled-components';
import { rgba } from 'polished';
import { Frame } from 'styles';

const Message = ({ title, subtitle }) => (
  <Wrapper>
    <Title>
      {title}
      <Dot>.</Dot>
    </Title>
    <Subtitle>{subtitle}</Subtitle>
  </Wrapper>
);

function Layout({ title, subtitle }) {
  return (
    <StyledWrapper>
      <StyledHeader />
      <StyledNotifier />
      <Message title={title} subtitle={subtitle} />
    </StyledWrapper>
  );
}

function Structure({ children }) {
  return <>{children}</>;
}

function Scene({ title, subtitle }) {
  return (
    <Structure>
      <Layout title={title} subtitle={subtitle} />
    </Structure>
  );
}

Message.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

Structure.propTypes = {
  children: PropTypes.node.isRequired
};

Scene.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

Scene.defaultProps = {
  title: '',
  subtitle: ''
};

const StyledWrapper = styled(Frame.Wrapper)`
  grid-template-columns: auto auto 1fr;

  box-shadow: ${props =>
    `inset 0 160px 100px -100px ${props.theme.colors.muted.dark}`};
  font-family: ${props => props.theme.fonts.freight};
  font-weight: 500;

  &:after {
    position: absolute;
    width: calc(${props => props.theme.frame.width});
    height: calc(${props => props.theme.frame.height});

    background-color: ${props => rgba(props.theme.colors.muted.dark, 0.85)};
    content: '';
    z-index: -1;
  }
`;

const StyledNotifier = styled(Notifier)`
  grid-column: 1 / span 3;
  grid-row: 1 / span 2;
  align-self: start;
  justify-self: center;
  margin-top: 32px;
`;

const StyledHeader = styled(Header)`
  grid-column: 1 / span 3;
  grid-row: 1 / span 2;
  align-self: start;
`;

const Wrapper = styled.div`
  grid-column: 1 / span 3;
  grid-row: 2 / span 8;
  margin: 24px;
  padding: 112px 72px;
`;

const Title = styled.div`
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.freight};
  font-size: 96px;
  font-weight: 700;
`;

const Dot = styled.span`
  color: ${props => props.theme.colors.main.avagreen};
`;

const Subtitle = styled.div`
  margin-top: 12px;
  margin-left: 4px;

  color: ${props => props.theme.colors.muted.lightbluegrey};
  font-family: ${props => props.theme.fonts.adelle};
  font-size: 24px;
  font-weight: 200;
`;

export default Scene;
