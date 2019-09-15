/* eslint-disable import/prefer-default-export */

export const getTier = plan =>
  ({ Prime: 'Prime', 1000: 'Tier 1', 2000: 'Tier 2', 3000: 'Tier 3' }[plan]);
