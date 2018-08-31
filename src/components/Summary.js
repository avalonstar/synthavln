import React from 'react';

import styled from 'styled-components';
import { Heart } from 'react-feather';

const Summary = props => (
  <Wrapper>
    <Heart size={18} />
    {/* <strong>5 new</strong> crusaders! */}
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  margin-left: 12px;
  padding: 8px 16px;

  box-shadow: inset 0 0 0 1px ${props => props.theme.colors.gray[6]};
  border-radius: 36px;
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
  white-space: nowrap;

  strong {
    font-weight: 800;
  }
`;

export default Summary;
