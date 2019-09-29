import React from 'react';
import PropTypes from 'prop-types';
import { Stage } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

import styled from 'styled-components';

import Scene from './Scene';

import { useTmiContext } from 'providers';

PIXI.utils.skipHello();
const HEIGHT = 1080;

function Toy({ auto, spam, width }) {
  return (
    <Wrapper>
      <Stage width={width} height={HEIGHT} options={{ transparent: true }}>
        <useTmiContext.Provider>
          <Scene width={width} height={HEIGHT} auto={auto} spam={spam} />
        </useTmiContext.Provider>
      </Stage>
    </Wrapper>
  );
}

Toy.propTypes = {
  auto: PropTypes.bool,
  spam: PropTypes.bool,
  width: PropTypes.number
};

Toy.defaultProps = {
  auto: false,
  spam: false,
  width: 1920
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
`;

export default Toy;
