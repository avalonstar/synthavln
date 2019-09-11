import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { Logo, Logotype } from './Branding';
import { Timer, Train } from './Train';
import { Pool } from './Pool';

function Hero({ className }) {
  return (
    <Wrapper className={className}>
      <StyledTimer />
      <StyledLogo />
      <StyledTrain />
      <StyledLogotype />
      <StyledPool />
    </Wrapper>
  );
}

Hero.propTypes = {
  className: PropTypes.string
};

Hero.defaultProps = {
  className: ''
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-template-rows: 24px auto;
  align-items: center;
`;

const StyledTimer = styled(Timer)`
  grid-column: 1 / span 3;
  grid-row: 1;
  align-self: start;
`;

const StyledLogo = styled(Logo)`
  grid-row: 2;
  padding-left: 24px;
`;

const StyledTrain = styled(Train)`
  grid-column: 2;
  grid-row: 2;
`;

const StyledLogotype = styled(Logotype)`
  grid-column: 2;
  grid-row: 2;
`;

const StyledPool = styled(Pool)`
  grid-column: 3;
  grid-row: 2;
`;

export default Hero;
