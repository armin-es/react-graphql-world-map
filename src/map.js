import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import VectorMap from '@south-paw/react-vector-maps';
import styled from 'styled-components';
import { Wrapper, MapWrapper } from './styled';

const StyledMap = styled(MapWrapper)`
  svg {
    path {
      fill: #1a3263;
      cursor: pointer;
      &:hover {
        fill: #f5564e;
      }
      &:focus {
        fill: #fab95b;
      }
    }
  }
`;

const Tooltip = styled.div`
  position: absolute;
  padding: 0.25rem;
  background: white;
  border: 0.2rem solid #ccc;
`;

class MyMap extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isTooltipVisible: false,
      tooltipY: 0,
      tooltipX: 0,
    };
  }

  onMouseMove = e =>
    this.setState({
      isTooltipVisible: true,
      tooltipY: e.clientY + 10,
      tooltipX: e.clientX + 10,
    });

  onMouseOut = () => this.setState({ isTooltipVisible: false });

  render() {
    const { map } = this.props;

    const tooltipStyle = {
      display: this.state.isTooltipVisible ? 'block' : 'none',
      top: this.state.tooltipY,
      left: this.state.tooltipX,
    };

    const layerProps = {
      onClick: this.props.onClick,
      onMouseOver: this.props.onMouseOver,
      onMouseMove: this.onMouseMove,
      onMouseOut: this.onMouseOut,
    };

    return (
      <Wrapper>
        <StyledMap style={{ margin: '0 auto', maxWidth: '100vw' }}>
          <VectorMap {...map} layerProps={layerProps} />
          <Tooltip style={tooltipStyle}>{this.props.current}</Tooltip>
        </StyledMap>
      </Wrapper>
    );
  }
}

MyMap.propTypes = {
  map: PropTypes.shape({
    id: PropTypes.string.isRequired,
    viewBox: PropTypes.string.isRequired,
    layers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        d: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default MyMap;