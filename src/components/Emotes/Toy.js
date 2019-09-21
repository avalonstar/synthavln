import React from 'react';
import PropTypes from 'prop-types';
import { Stage } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

import styled from 'styled-components';

import Scene from './Scene';

PIXI.utils.skipHello();
const WIDTH = 1920;
const HEIGHT = 1080;

function Toy({ auto, spam }) {
  return (
    <Wrapper>
      <Stage width={WIDTH} height={HEIGHT} options={{ transparent: true }}>
        <Scene width={WIDTH} height={HEIGHT} auto={auto} spam={spam} />
      </Stage>
    </Wrapper>
  );
}

Toy.propTypes = {
  auto: PropTypes.bool,
  spam: PropTypes.bool
};

Toy.defaultProps = {
  auto: false,
  spam: false
};

const Wrapper = styled.div`
  position: absolute;
  width: 1920px;
  height: 1080px;
`;

export default Toy;
