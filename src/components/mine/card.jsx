import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slider from 'ui/slider';
import { GRADE_MAPPING } from '../../constants/constants.json';

import imgCrown1 from './crown1.png';
import imgCrown2 from './crown2.png';
import imgCrown3 from './crown3.png';
import imgCrown4 from './crown4.png';
import imgCrown5 from './crown5.png';

const crownMapping = {
  0: imgCrown1,
  1: imgCrown1,
  2: imgCrown2,
  3: imgCrown3,
  4: imgCrown4,
  5: imgCrown5,
};

const gradeStyles = {
  0: {
    color: '#ACBDE0',
    bg: 'background-image: linear-gradient(-195deg, #899CBB 0%, #596A85 100%);',
  },
  1: {
    color: '#ACBDE0',
    bg: 'background-image: linear-gradient(-195deg, #899CBB 0%, #596A85 100%);',
  },
  2: {
    color: '#C7D7D5',
    bg: 'background-image: linear-gradient(-193deg, #93BBB8 0%, #4C746F 100%);',
  },
  3: {
    color: '#E0E0E1',
    bg: 'background-image: linear-gradient(-199deg, #CED0D6 0%, #949AA2 100%)',
  },
  4: {
    color: '#F8E2C1',
    bg: 'background-image: linear-gradient(-191deg, #EBD1A9 0%, #BE9C68 100%)',
  },
  5: {
    color: '#DAA848',
    bg: 'background-image: linear-gradient(-190deg, #5D5F63 0%, #252527 95%)',
  },
};

const Container = styled.div`
  padding: 0.35rem 0.25rem;
  background-color: #1a1515;
`;

const Info = styled.div`
  height: 1.7rem;
  border-radius: 0.1rem;
  ${props => props.bg};
`;

const TitleContainer = styled.div`
  position: relative;
  div {
    position: absolute;
    top: -0.25rem;
    left: 0;
    right: 0;
    img {
      margin: 0 auto;
      width: 0.5rem;
    }
  }
`;

const BaseP = styled.p`color: ${props => props.color};`;

const Item = styled(BaseP)`
  margin-top: 0.05rem;
  text-align: center;
  line-height: 0.2rem;
  font-size: 0.18rem;
`;

const Name = styled(Item)`
  margin-top: 0;
  padding-top: 0.33rem;
  font-size: 0.2rem;
`;

const No = styled(Item)`
  margin-top: 0.6rem;
  padding-left: 0.15rem;
  text-align: left;
  font-size: 0.14rem;
`;

const Card = ({ user }) => {
  const grade = user.get('grade');
  const style = gradeStyles[grade];

  return (
    <Slider disableAutoPlay>
      <Container>
        <Info bg={style.bg}>
          <TitleContainer>
            <div>
              <img src={crownMapping[grade]} alt="" />
            </div>
          </TitleContainer>
          <Name color={style.color}>{GRADE_MAPPING[grade]}</Name>
          <Item color={style.color}>{user.get('name')}</Item>
          <No color={style.color}>账号编号：{user.get('phone')}</No>
        </Info>
      </Container>
      {/* <Container></Container> */}
    </Slider>
  );
};

Card.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Card;
