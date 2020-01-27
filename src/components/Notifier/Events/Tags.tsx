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

const svgSize = 16;

export const Cheer = () => (
  <Tag>
    <Bits size={svgSize} /> cheer
  </Tag>
);

export const MysteryGift = () => (
  <Tag>
    <Gift size={svgSize} /> subgift
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

export const SPChange = ({ plan, count = '1' }) => (
  <Tag>
    <SPBadge size={svgSize} /> sp + {utils.getSubValue(plan) * count}
  </Tag>
);

export const SPRetain = () => (
  <Tag>
    <SPBadge size={svgSize} /> sp + 0
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

export const Upgrade = () => (
  <Tag>
    <Sub size={svgSize} /> upgrade
  </Tag>
);

SPChange.propTypes = {
  plan: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

SPChange.defaultProps = {
  plan: '1000',
  count: '1'
};

Tier.propTypes = {
  plan: PropTypes.string
};

Tier.defaultProps = {
  plan: '1000'
};

const Tag = styled.div`
  flex-grow: 1;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;

  text-transform: uppercase;

  svg {
    padding-right: 6px;
  }
`;
