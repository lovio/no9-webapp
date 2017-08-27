import styled from 'styled-components';

export Slider from './slider';
export Empty from './empty';
export { Button } from './button';

export const Container = styled.div`
  background-color: white;
  display: flex;
  height: 100%;
  flex-direction: column;
`;

export const DefaultContainer = styled(Container)`
  flex: 1;
`;

export const GreyContainer = styled(Container) `
  background-color: #F7F8FA;
`;

export const BasicOverflowContainer = styled.div`
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background-color: #F7F8FA;
`;

export const OverflowContainer = styled(BasicOverflowContainer)`
  // margin-bottom: -0.5rem;
  // padding-bottom: 0.5rem;
`;

export const Footer = styled.div`
  height: 0.5rem;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 1);
`;


// 未来可能是轮播。谁知道呢。。。
export const AdBanner = styled.div`
  margin: 0.1rem 0 0;
  img {
    width: 100%;
  }
`;

// todo useless
export const Image = styled.img`
  border: none;
  vertical-align: top;
`;
