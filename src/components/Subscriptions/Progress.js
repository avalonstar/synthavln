import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';

import styled from 'styled-components';

const propTypes = {
  className: PropTypes.string,
  goal: PropTypes.shape({}),
  score: PropTypes.number
};

const defaultProps = {
  className: '',
  goal: {},
  score: 0
};

const meterPropTypes = {
  progress: PropTypes.number.isRequired
};

const getWidth = (span, end) => (span / end) * 100;

const Meter = ({ progress }) => (
  <Bar pose="progress" poseKey={progress} width={progress} />
);

class Progress extends PureComponent {
  render() {
    const {
      className,
      score,
      goal: { minimum_score: next }
    } = this.props;
    return (
      <Wrapper className={className}>
        <Meter progress={getWidth(score, next)} />
      </Wrapper>
    );
  }
}

const barPoses = {
  progress: {
    width: ({ width }) => `${width}%`
  }
};

Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;
Meter.propTypes = meterPropTypes;

const Wrapper = styled.div`
  position: relative;
  height: 2px;
  z-index: 2000;
  background: #68770b;
`;

const Bar = styled(posed.div(barPoses))`
  background: ${props => props.theme.colors.green[0]};
  height: 2px;
`;

export default Progress;
