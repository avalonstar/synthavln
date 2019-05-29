import React from 'react';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';

import { Bits, Follow, Gift, Raid, Sub, Tip } from 'components/Icons/Queue';

import styled from 'styled-components';

const getType = () => ({
  cheer: <Bits />,
  follow: <Follow />,
  mysterygift: <Gift />,
  subscription: <Sub />,
  subgift: <Gift />,
  raid: <Raid />,
  resub: <Sub />,
  tip: <Tip />
});

const Item = ({ data, style }) => (
  <animated.li style={style}>
    <Wrapper>{getType()[data.event]}</Wrapper>
  </animated.li>
);

Item.propTypes = {
  style: PropTypes.shape({}),
  data: PropTypes.shape({
    event: PropTypes.string.isRequired,
    timestamp: PropTypes.object // eslint-disable-line
  }).isRequired
};

Item.defaultProps = {
  style: {}
};

const Wrapper = styled.div`
  padding: 0px 6px;
`;

export default Item;
