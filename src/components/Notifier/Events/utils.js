export const getSubValue = plan =>
  ({
    Prime: '1',
    1000: '1',
    2000: '2',
    3000: '6'
  }[plan]);

export const getTier = plan =>
  ({
    Prime: 'Prime',
    1000: 'Tier 1',
    2000: 'Tier 2',
    3000: 'Tier 3'
  }[plan]);
