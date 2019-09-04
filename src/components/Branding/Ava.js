import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';

import styled from 'styled-components';
import { Frame } from 'styles';

import business from './assets/ava-business.png';
import ffxiv from './assets/ava-ffxiv.png';
import destiny from './assets/ava-destiny.png';
import starShirt from './assets/ava-star-shirt.png';

const Business = ({ version, className }) => (
  <Image
    initialPose="exit"
    pose={version === 'business' ? 'enter' : 'exit'}
    className={className}
    src={business}
    alt="business"
  />
);

const Destiny = ({ version, className }) => (
  <Image
    initialPose="exit"
    pose={version === 'destiny' ? 'enter' : 'exit'}
    className={className}
    src={destiny}
    alt="destiny"
  />
);

const Lyse = ({ version, className }) => (
  <Image
    initialPose="exit"
    pose={version === 'ffxiv' ? 'enter' : 'exit'}
    className={className}
    src={ffxiv}
    alt="ffxiv"
  />
);

const StarShirt = ({ version, className }) => (
  <Image
    initialPose="exit"
    pose={version === 'variety' ? 'enter' : 'exit'}
    className={className}
    src={starShirt}
    alt="starShirt"
  />
);

const getAva = version =>
  ({
    business: <StyledBusiness version={version} />,
    destiny: <StyledDestiny version={version} />,
    ffxiv: <StyledLyse version={version} />,
    variety: <StyledStarShirt version={version} />
  }[version]);

const Ava = ({ version }) => <Frame.Base>{getAva(version)}</Frame.Base>;

Ava.propTypes = {
  version: PropTypes.string
};

Ava.defaultProps = {
  version: 'variety'
};

Business.propTypes = {
  className: PropTypes.string,
  version: PropTypes.string.isRequired // eslint-disable-line
};

Business.defaultProps = {
  className: ''
};

Destiny.propTypes = {
  className: PropTypes.string,
  version: PropTypes.string.isRequired // eslint-disable-line
};

Destiny.defaultProps = {
  className: ''
};

Lyse.propTypes = {
  className: PropTypes.string,
  version: PropTypes.string.isRequired // eslint-disable-line
};

Lyse.defaultProps = {
  className: ''
};

StarShirt.propTypes = {
  className: PropTypes.string,
  version: PropTypes.string.isRequired // eslint-disable-line
};

StarShirt.defaultProps = {
  className: ''
};

const Image = posed.img({
  exit: {
    x: 20,
    opacity: 0
  },
  enter: {
    x: 0,
    opacity: 1
  }
});

const StyledBusiness = styled(Business)`
  position: absolute;
  bottom: -190px;
  right: -85px;
  z-index: 1500;
  width: 340px;
`;

const StyledDestiny = styled(Destiny)`
  position: absolute;
  bottom: 0;
  right: -65px;
  z-index: 1500;
  width: 340px;
`;

const StyledLyse = styled(Lyse)`
  position: absolute;
  bottom: 0;
  right: -75px;
  z-index: 1500;
  width: 300px;
`;

const StyledStarShirt = styled(StarShirt)`
  position: absolute;
  bottom: 0;
  right: -80px;
  z-index: 1500;
  width: 340px;
`;

export default Ava;
