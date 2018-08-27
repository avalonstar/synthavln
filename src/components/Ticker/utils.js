import _ from 'lodash';

export const getCheermoteURL = amount => {
  if (_.inRange(amount, 1, 99)) {
    return 'https://static-cdn.jtvnw.net/bits/dark/animated/gray/1';
  } else if (_.inRange(amount, 100, 999)) {
    return 'https://static-cdn.jtvnw.net/bits/dark/animated/purple/1';
  } else if (_.inRange(amount, 1000, 4999)) {
    return 'https://static-cdn.jtvnw.net/bits/dark/animated/green/1';
  } else if (_.inRange(amount, 5000, 9999)) {
    return 'https://static-cdn.jtvnw.net/bits/dark/animated/blue/1';
  } else if (_.inRange(amount, 10000, 99999)) {
    return 'https://static-cdn.jtvnw.net/bits/dark/animated/red/1';
  }

  return 'https://static-cdn.jtvnw.net/bits/dark/animated/gold/1';
};

export const getLoyaltyBadgeURL = length => {
  if (_.inRange(length, 1, 2)) {
    return 'https://static-cdn.jtvnw.net/badges/v1/95296b56-7b07-4def-916f-be81c38db832/2';
  } else if (_.inRange(length, 3, 5)) {
    return 'https://static-cdn.jtvnw.net/badges/v1/baccca33-a2de-49c9-b10e-670bc719ab15/2';
  } else if (_.inRange(length, 6, 11)) {
    return 'https://static-cdn.jtvnw.net/badges/v1/caea609c-65c4-4bf4-896e-c9255a1f145d/2';
  } else if (_.inRange(length, 12, 23)) {
    return 'https://static-cdn.jtvnw.net/badges/v1/0cc3ed00-7912-4e12-9cc4-fc32baf3f7f6/2';
  }

  return 'https://static-cdn.jtvnw.net/badges/v1/6ad8ed8e-271d-4775-81f6-a1842701e245/2';
};
