import styled from 'styled-components';

const Button = styled.button`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '0.48rem'};
  outline: none;
  border: none;
  padding: 0;
  background-color: #57d3f2;
  border-radius: 0.02rem;
  font-size: 0.18rem;
  line-height: ${props => props.height || '0.48rem'};
  color: #fff;

  &:disabled {
    opacity: 0.5;
  }
`;

export default Button;
