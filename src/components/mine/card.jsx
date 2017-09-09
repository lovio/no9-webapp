import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import styled from 'styled-components';
import Slider from 'ui/slider';
import { GRADE_MAPPING } from '../../constants/constants.json';

import imgCardBg from './card-bg.jpg';
import imgCrown from './crown.png';

const Container = styled.div`padding: 0.35rem 0.25rem;`;

const Info = styled.div`
  height: 1.7rem;
  border-radius: 0.1rem;
  background-image: url("${imgCardBg}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
const TitleContainer = styled.div`position: relative;`;

const Title = styled.div`
  position: absolute;
  top: -0.29rem;
  display: flex;
  flex-direction: column;
  justify-content:center;
  margin-left: 1.37rem;
  width: 0.64rem;
  height: 0.58rem;
  background-image: url("${imgCrown}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  text-align: center;
  padding-right:0.1rem;

`;

const TitleName = styled.p`
  line-height: 0.18rem;
  font-size: 0.12rem;
  color: #e01053;
`;

const Item = styled.p`
  margin-top: 0.05rem;
  text-align: center;
  /* 韩韩韩: */
  font-weight: bolder;
  font-size: 0.14rem;
  line-height: 0.2rem;
  color: rgba(255, 255, 255, 0.8);
`;

const Name = styled(Item)`
  margin-top: 0;
  padding-top: 0.33rem;
`;

const No = styled(Item)`
  margin-top: 0.6rem;
  padding-left: 0.15rem;
  text-align: left;
`;

const Card = ({ user }) => (
  <Slider disableAutoPlay>
    <Container>
      <Info>
        <TitleContainer>
          <Title>
            {map(GRADE_MAPPING[user.get('grade')], title => <TitleName>{title}</TitleName>)}
          </Title>
        </TitleContainer>
        <Name>{user.get('name')}</Name>
        <Item>打败了全国 98%的用户</Item>
        <No>账号编号：{user.get('phone')}</No>
      </Info>
    </Container>
    <Container>
      <Info />
    </Container>
  </Slider>
);

Card.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Card;
