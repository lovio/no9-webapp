import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from 'ui';

import imgAchieved2 from 'images/medal/medal-achieved-2.png';
import imgUnclaimed2 from 'images/medal/medal-unclaimed-2.png';
import imgAchieved3 from 'images/medal/medal-achieved-3.png';
import imgUnclaimed3 from 'images/medal/medal-unclaimed-3.png';
import imgAchieved4 from 'images/medal/medal-achieved-4.png';
import imgUnclaimed4 from 'images/medal/medal-unclaimed-4.png';
import imgAchieved5 from 'images/medal/medal-achieved-5.png';
import imgUnclaimed5 from 'images/medal/medal-unclaimed-5.png';
import imgAchieved6 from 'images/medal/medal-achieved-6.png';
import imgUnclaimed6 from 'images/medal/medal-unclaimed-6.png';
import imgAchieved7 from 'images/medal/medal-achieved-7.png';
import imgUnclaimed7 from 'images/medal/medal-unclaimed-7.png';
import imgAchieved8 from 'images/medal/medal-achieved-8.png';
import imgUnclaimed8 from 'images/medal/medal-unclaimed-8.png';
import imgAchieved9 from 'images/medal/medal-achieved-9.png';
import imgUnclaimed9 from 'images/medal/medal-unclaimed-9.png';
import imgAchieved10 from 'images/medal/medal-achieved-10.png';
import imgUnclaimed10 from 'images/medal/medal-unclaimed-10.png';
import imgAchieved13 from 'images/medal/medal-achieved-13.png';
import imgAchieved14 from 'images/medal/medal-achieved-14.png';
import imgAchieved15 from 'images/medal/medal-achieved-15.png';
import imgStar from 'images/medal-bg-star.png';

export const Medal = styled.div`
  img {
    width: 100%;
    max-width: 1.8rem;
  }
`;

export const Star = styled.div`
  img {
    position: absolute;
    top: -0.04rem;
    width: 0.24rem;
  }
`;

export default class Container extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const id = this.props.id;
    const type = this.props.type;
    let image;

    if (type === 'unclaimed') {
      switch (parseInt(id, 10)) {
        case 2:
          image = imgUnclaimed2;
          break;
        case 3:
          image = imgUnclaimed3;
          break;
        case 4:
          image = imgUnclaimed4;
          break;
        case 5:
          image = imgUnclaimed5;
          break;
        case 6:
          image = imgUnclaimed6;
          break;
        case 7:
          image = imgUnclaimed7;
          break;
        case 8:
          image = imgUnclaimed8;
          break;
        case 9:
          image = imgUnclaimed9;
          break;
        case 10:
          image = imgUnclaimed10;
          break;
        default:
          break;
      }
    } else {
      switch (parseInt(id, 10)) {
        case 2:
          image = imgAchieved2;
          break;
        case 3:
          image = imgAchieved3;
          break;
        case 4:
          image = imgAchieved4;
          break;
        case 5:
          image = imgAchieved5;
          break;
        case 6:
          image = imgAchieved6;
          break;
        case 7:
          image = imgAchieved7;
          break;
        case 8:
          image = imgAchieved8;
          break;
        case 9:
          image = imgAchieved9;
          break;
        case 10:
          image = imgAchieved10;
          break;
        case 13:
          image = imgAchieved13;
          break;
        case 14:
          image = imgAchieved14;
          break;
        case 15:
          image = imgAchieved15;
          break;
        default:
          break;
      }
    }

    return (
      <div style={{ position: 'relative' }}>
        <Medal>
          <Image src={image} />
        </Medal>

        {
          type === 'get' ? (
            <Star>
              <Image src={imgStar} />
            </Star>
          ) : ''
        }
      </div>
    );
  }
}
