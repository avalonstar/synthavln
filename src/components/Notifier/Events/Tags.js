import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import {
  Gift,
  CreditCard,
  Star,
  Heart,
  PlusSquare,
  Square,
  Target,
  Zap
} from 'react-feather';

import * as utils from '../utils';

const planPropTypes = {
  plan: PropTypes.string,
  amount: PropTypes.number // eslint-disable-line
};

const planDefaultProps = {
  plan: '1000',
  amount: 1
};

const svgSize = 16;

export const Cheer = () => (
  <Tag>
    <Zap size={svgSize} /> cheer
  </Tag>
);

export const MysteryGift = () => (
  <Tag>
    <Gift size={svgSize} /> mass subgift
  </Tag>
);

export const Resub = () => (
  <Tag>
    <Star size={svgSize} /> resub
  </Tag>
);

export const Raid = () => (
  <Tag>
    <Target size={svgSize} /> raid
  </Tag>
);

export const SPChange = ({ plan, amount = 1 }) => (
  <Tag>
    <PlusSquare size={svgSize} /> sp + {utils.getSubValue(plan) * amount}
  </Tag>
);

export const SPRetain = () => (
  <Tag>
    <Square size={svgSize} /> sp retain
  </Tag>
);

export const SubGift = () => (
  <Tag>
    <Gift size={svgSize} /> subgift
  </Tag>
);

export const Subscription = () => (
  <Tag>
    <Star size={svgSize} /> sub
  </Tag>
);

export const Tip = () => (
  <Tag>
    <CreditCard size={svgSize} /> tip
  </Tag>
);

export const Tier = ({ plan }) => (
  <Tag plan={plan}>
    <Heart size={svgSize} /> {utils.getTier(plan)}
  </Tag>
);

SPChange.propTypes = planPropTypes;
SPChange.defaultProps = planDefaultProps;
Tier.propTypes = planPropTypes;
Tier.defaultProps = planDefaultProps;

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: 12px;

  text-transform: uppercase;

  svg {
    padding-right: 4px;
  }
`;
