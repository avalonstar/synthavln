/* eslint-disable consistent-return */

const getCheerTier = bits => {
  if (bits < 100) return `100`;
  if (bits >= 100 && bits < 1000) return `100`;
  if (bits >= 1000 && bits < 2500) return `1000`;
  if (bits >= 2500 && bits < 5000) return `2500`;
  if (bits >= 5000 && bits < 10000) return `5000`;
  if (bits >= 10000) return `10000`;
};

export const getSongFile = props => {
  switch (props.event) {
    case 'resub':
    case 'subgift':
    case 'subscription':
      return `${props.event}-${
        { Prime: 1000, 1000: 1000, 2000: 2000, 3000: 3000 }[props.subPlan]
      }`;
    case 'cheer':
      return `cheer-${getCheerTier(props.amount)}`;
    case 'follow':
      return `follow-${Math.floor(Math.random() * 3) + 1}`;
    default:
      return props.event;
  }
};

export const getSubValue = plan =>
  ({ Prime: '1', 1000: '1', 2000: '2', 3000: '6' }[plan]);

export const getTier = plan =>
  ({ Prime: 'Prime', 1000: 'Tier 1', 2000: 'Tier 2', 3000: 'Tier 3' }[plan]);
