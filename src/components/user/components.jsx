import styled from 'styled-components';

export const Container = styled.div`
  background-color: #F7F8FA;
  height: 100%;
`;

export const BtnContainer = styled.div`
  margin: 0.1rem 0.15rem 0.14rem;
`;

export const FieldContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  border-bottom: 0.01rem solid #EEEEEE;
  background-color: #FFF;
  padding: 0 0.15rem;
  align-items: center;

  label {
    line-height: 0.44rem;
    font-size: 0.14rem;
    color: #2E3236;
    margin-right: 0.2rem;
  }

  select {
    background-color: #FFF;
    appearance: none;
    box-shadow: none;
    display: inline-block;
    height: 0.44rem;
    flex: 1;
    outline: none;
    border: none;
    font-size: 0.14rem;
    line-height: 0.44rem;
    color: #8F9DA5!important;
    &:focus {
      outline: none;
    }
    option { direction: ltr; }
  }

  input {
    display: inline-block;
    width: 100%;
    flex: 1;
    outline: none;
    border: none;
    font-size: 0.14rem;
    line-height: 0.44rem;
    color: #8F9DA5;
    text-align: right;
    &:focus {
      outline: none;
    }
  }
`;

export const SignOut = styled.div`
  border-top: 0.01rem solid #EAEFF2;
  border-bottom: 0.01rem solid #EAEFF2;
  margin: 0.1rem 0 0.06rem;
  text-align: center;
  line-height: 0.44rem;
  height: 0.44rem;
  font-size: 0.14rem;
  color: #E73636;
  background-color: #FFF;
`;
