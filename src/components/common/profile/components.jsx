import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import imgBgHome from 'images/bg-home.jpg';
import imgArrowSmall from 'images/arrowSmall.png';
import imgArrow from 'images/arrow.png';

export const HeaderContainer = styled.div`
  background-color: #FFF;
  ${(props) => {
    if (!props.theme.white) {
      return `
        background-image: url('${imgBgHome}');
        background-repeat: no-repeat;
        background-size: cover;
      `;
    }
    return '';
  }}
  padding: 0.2rem 0;
`;

export const Name = styled.p`
  display: inline-block;
  margin: 0 0 0.06rem 0;
  font-size: 0.14rem;
  line-height: 0.2rem;
  color: ${(props) => {
    if (props.theme.white) {
      return '#2E3236';
    }
    return '#FFFFFF';
  }};
`;

export const Badge = styled.div`
  float: left;
  display: flex;
  height: 0.24rem;
  /* Rectangle: */
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  ${(props) => {
    if (props.theme.white) {
      return `
      background-color: #EAEFF2;
      color: #2E3236;
      `;
    }
    return '';
  }}
  letter-spacing: 0;
  padding: 0 0.1rem;
  align-items: center;

  img {
    width: 0.1rem;
    height: 0.1rem;
    margin-right: 0.02rem;
  }

  span {
    flex: 1;
    font-size: 0.11rem;
    line-height: 0.24rem;
    padding-right: 0.1rem;
    background-image: url('${(props) => {
      if (props.theme.white) {
        return imgArrow;
      }
      return imgArrowSmall;
    }}');
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 0.04rem 0.06rem;
  }

`;

export const BadgeCustomPlan = styled.div`
  float: left;
  display: inline-block;
  padding-left: 0.05rem;
  width: 1.1rem;
  height: 0.24rem;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const Analytics = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.2rem 0.23rem 0;
  /* Mask: */
  ${props => props.theme.white && 'border-top: 0.01rem solid #EAEFF2;'}

`;

export const AnalyticsItemData = styled.p`
  font-size: 0.24rem;
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: center;
  margin: 0 0 0.02rem;
  line-height: 0.34rem;
  ${(props) => {
    if (props.theme.white) {
      return `
        color: #2E3236;
      `;
    }
    return '';
  }}
`;

export const AnalyticsItemTitle = styled.p`
  font-size: 0.1rem;
  color: #FFFFFF;
  letter-spacing: 0;
  line-height: 0.14rem;
  text-align: center;
  margin: 0;
  ${(props) => {
    if (props.theme.white) {
      return `
      color: #8F9DA5;
      `;
    }
    return 'opacity: 0.5;';
  }}
`;

export const AnalyticsSetLink = styled.span`
  /* 去设置: */
  color: #FE663B;
  margin-left: 0.05rem;
`;

// rest here is onClick
export function AnalyticsItem({ title, data, ...rest }) {
  return (
    <div style={{ height: '0.5rem', width: '100%' }} {...rest}>
      <AnalyticsItemData>{data === -1 ? '-' : data}</AnalyticsItemData>
      <AnalyticsItemTitle>
        {title}
        { data === -1 && (
          <AnalyticsSetLink>去设置</AnalyticsSetLink>
        ) }
      </AnalyticsItemTitle>
    </div>
  );
}

AnalyticsItem.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

AnalyticsItem.defaultProps = {
  data: -1,
};
