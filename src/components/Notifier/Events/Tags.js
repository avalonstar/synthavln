import React from 'react';

import * as utils from '../utils';

import styled from 'styled-components';
import {
  Gift,
  CreditCard,
  Star,
  Heart,
  PlusSquare,
  Square,
  Zap
} from 'react-feather';

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

export const SPChange = props => (
  <Tag>
    <PlusSquare size={svgSize} /> sp + {utils.getSubValue(props.plan)}
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

export const Tier = props => (
  <Tag plan={props.plan}>
    <Heart size={svgSize} /> {utils.getTier(props.plan)}
  </Tag>
);

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: 12px;

  text-transform: uppercase;

  svg {
    padding-right: 4px;
  }
`;
