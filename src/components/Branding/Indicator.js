import React from 'react';

import styled from 'styled-components';

const Indicator = props => <Square className={props.className} />;

const Square = styled.div`
  position: absolute;
  width: 24px;
  height: 28px;
  z-index: 2000;

  background-image: linear-gradient(-135deg, #f5faa4 0%, #afd76b 100%);
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
`;

export default Indicator;
