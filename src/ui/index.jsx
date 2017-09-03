import styled from 'styled-components';

const bgColor = 'backgroundColor: #F4F3F3;';
const footerHeight = '0.5rem';

export { Button } from './button';

export const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  ${bgColor};
`;

export const Overflow = styled.div`
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

// export const OverflowContainer = styled(BasicOverflowContainer)`
//   // margin-bottom: -0.5rem;
//   // padding-bottom: 0.5rem;
// `;

export const Footer = styled.div`
  height: ${footerHeight};
  z-index: 1000;
  ${bgColor};

  display: flex;
  justify-content: space-around;
  border-top: 0.01rem solid #EAEFF2;
`;
