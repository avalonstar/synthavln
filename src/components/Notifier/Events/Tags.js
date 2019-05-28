import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import {
  Bits,
  Gift,
  Raid as RaidIcon,
  SPBadge,
  Sub,
  Tier as TierIcon,
  Tip as TipIcon
} from 'components/Icons/Notifier';

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
    <Bits size={svgSize} /> cheer
  </Tag>
);

export const MysteryGift = () => (
  <Tag>
    <Gift size={svgSize} /> mass subgift
  </Tag>
);

export const Resub = () => (
  <Tag>
    <Sub size={svgSize} /> resub
  </Tag>
);

export const Raid = () => (
  <Tag>
    <RaidIcon size={svgSize} /> raid
  </Tag>
);

export const SPChange = ({ plan, amount = 1 }) => (
  <Tag>
    <SPBadge size={svgSize} /> sp + {utils.getSubValue(plan) * amount}
  </Tag>
);

export const SPRetain = () => (
  <Tag>
    <SPBadge size={svgSize} /> sp retain
  </Tag>
);

export const SubGift = () => (
  <Tag>
    <Gift size={svgSize} /> subgift
  </Tag>
);

export const Subscription = () => (
  <Tag>
    <Sub size={svgSize} /> sub
  </Tag>
);

export const Tip = () => (
  <Tag>
    <TipIcon size={svgSize} /> tip
  </Tag>
);

export const Tier = ({ plan }) => (
  <Tag plan={plan}>
    <TierIcon size={svgSize} /> {utils.getTier(plan)}
  </Tag>
);

SPChange.propTypes = planPropTypes;
SPChange.defaultProps = planDefaultProps;
Tier.propTypes = planPropTypes;
Tier.defaultProps = planDefaultProps;

const Tag = styled.div`
  flex-grow: 1;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;

  text-transform: uppercase;

  svg {
    padding-right: 4px;
  }
`;
