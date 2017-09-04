import styled from 'styled-components';

const BasicButton = styled.button`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '0.48rem'};
  outline: none;
  border: none;
  border: 1px solid #57d3f2;
  padding: 0;
  border-radius: 0.02rem;
  font-size: 0.18rem;
  line-height: ${props => props.height || '0.48rem'};

  &:disabled {
    opacity: 0.5;
  }
`;

const Button = styled(BasicButton)`
  background-color: #57d3f2;
  color: #fff;
`;

export const CavityButton = styled(BasicButton)`
  color: #57d3f2;
  background-color: #f4f3f3;
`;

export default Button;
