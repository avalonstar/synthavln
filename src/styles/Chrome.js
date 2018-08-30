import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { rgba } from 'polished';

const propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string,
  explicitHeight: PropTypes.bool,
  children: PropTypes.node.isRequired
};

const defaultProps = {
  title: '',
  explicitHeight: false
};

const Chrome = props => (
  <Wrapper className={props.className} explicitHeight={props.explicitHeight}>
    <Header>
      <Buttons>
        <Circle color="#ff5f57" />
        <Circle color="#ffc130" />
        <Circle color="#02fa7b" />
      </Buttons>
      <Title>{props.title}</Title>
    </Header>
    {props.children}
  </Wrapper>
);

Chrome.propTypes = propTypes;
Chrome.defaultProps = defaultProps;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => (props.explicitHeight ? '100%' : 'auto')};
  overflow: hidden;

  box-shadow: ${props => props.theme.shadows[3]};
  border-radius: 6px;
`;

const Zone = styled.div`
  display: block;
  flex: 1;
  position: relative;
  overflow: hidden;

  background: ${props => props.theme.colors.gray[0]};
  color: ${props => props.theme.colors.gray[0]};
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`;

const Header = styled.div`
  position: relative;
  align-items: center;
  padding: 12px;

  background: ${props => props.theme.colors.gray[2]};
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

const Buttons = styled.div`
  position: absolute;
  top: 14px;
  display: flex;
`;

const Circle = styled.div`
  width: 12px;
  height: 12px;
  margin-right: 6px;

  background: ${props => props.theme.colors.gray[2]};
  box-shadow: inset 0 0 0 2px ${props => props.color};
  border-radius: 12px;
`;

const Title = styled.div`
  height: 16px;

  color: ${props => props.theme.colors.gray[12]};
  font-family: ${props => props.theme.fonts.din};
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
`;

export default Chrome;
