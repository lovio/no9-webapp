import styled from 'styled-components';

export const Button = styled.button`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '0.44rem'};
  outline: none;
  border: none;
  padding: 0;
  background-image: linear-gradient(-90deg, #FE663B 0%, #FF8900 100%);
  border-radius: 0.03rem;
  font-size: 0.14rem;
  line-height: ${props => props.height || '0.44rem'};
  color: #FFF;

  &:disabled {
    opacity: 0.5;
  }
  &:active {
    background-color: #DF4E25;
  }
`;
