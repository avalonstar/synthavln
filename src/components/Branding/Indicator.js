import React from 'react';

import styled from 'styled-components';

const Indicator = props => <Square className={props.className} />;

const Square = styled.div`
  width: 24px;
  height: 28px;

  background-image: linear-gradient(-135deg, #f5faa4 0%, #afd76b 100%);
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
`;

export default Indicator;
