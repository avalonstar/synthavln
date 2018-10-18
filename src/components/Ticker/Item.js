import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import {
  CheerEvent,
  FollowEvent,
  MysteryGiftEvent,
  SubscriptionEvent,
  SubGiftEvent,
  RaidEvent,
  ResubEvent,
  TipEvent
} from './Events';

const propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    event: PropTypes.string.isRequired
  }).isRequired,
  hostRef: PropTypes.func.isRequired,
  style: PropTypes.shape({})
};

const defaultProps = {
  className: '',
  style: {}
};

const getType = data => ({
  cheer: CheerEvent({ ...data }),
  follow: FollowEvent({ ...data }),
  mysterygift: MysteryGiftEvent({ ...data }),
  subscription: SubscriptionEvent({ ...data }),
  subgift: SubGiftEvent({ ...data }),
  raid: RaidEvent({ ...data }),
  resub: ResubEvent({ ...data }),
  tip: TipEvent({ ...data })
});

class Item extends PureComponent {
  render() {
    const { className, data, hostRef, style } = this.props;
    return (
      <Wrapper className={className} innerRef={hostRef} style={style}>
        {getType(data)[data.event]}
        <Actor>{data.from || data.name}</Actor>
      </Wrapper>
    );
  }
}

Item.propTypes = propTypes;
Item.defaultProps = defaultProps;

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 14px;

  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;

  img {
    filter: grayscale(90%);
  }

  :first-child {
    box-shadow: inset 0 0 0 1px ${props => props.theme.colors.gray[6]};
    border-radius: 4px;
    color: ${props => props.theme.colors.white};

    :before {
      position: relative;
      content: '!HYPE';

      color: ${props => props.theme.colors.gray[10]};
      font-family: ${props => props.theme.fonts.inter};
      font-weight: 600;
      padding-right: 12px;
    }

    img {
      filter: grayscale(0%);
    }
    svg {
      color: ${props => props.theme.colors.green[0]};
    }
  }

  :not(:first-child) {
    box-shadow: inset -1px 0 0 0 ${props => props.theme.colors.gray[3]};
    color: ${props => props.theme.colors.gray[6]};
  }
`;

const Actor = styled.div`
  padding-left: 4px;
  white-space: nowrap;
  font-weight: 800;
`;

export default Item;
