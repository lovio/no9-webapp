import styled from 'styled-components';

import defaultAvatar from '../images/defaultAvatar.jpg';

const DEFAULT_WIDTH = '0.5rem';

function getFloatByProps({ left, right }) {
  if (left) {
    return 'left';
  } else if (right) {
    return 'right';
  }
  return '';
}

export default styled.div`
  float: ${props => getFloatByProps(props)};
  width: ${props => props.width || DEFAULT_WIDTH};
  height: ${props => props.height || DEFAULT_WIDTH};
  display: block;
  background-image: url(${props => props.src || defaultAvatar});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 9999px;
  border: none;
`;
