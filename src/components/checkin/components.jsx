import styled from 'styled-components';

import imgCheckin from 'images/checkinCircle.png';

export const Desc = styled.p`
  margin: 0.07rem 0 0.2rem 0.15rem;
  padding-left: 0.18rem;
  line-height: 0.18rem;
  font-size: 0.12rem;
  color: #8F9BA6;
  letter-spacing: 0;
  background-image: url('${imgCheckin}');
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 0.14rem 0.14rem;
`;

export const BtnContainer = styled.div`
  padding: 0 0.15rem;
`;
