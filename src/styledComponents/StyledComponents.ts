import styled from 'styled-components';

export const Button = styled.button`
  width: 100px;
  height: 50px;
  background: blue;
  color: white;
  border-radius: 3px;
  border: none;

  &:hover {
    background: lightblue;
    cursor: pointer;
  }
`;

export const H1 = styled.h1`
  color: #565656;
`;

export const Div = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  text-align: center;
  border: 1px solid #565656;
  background-color: white;
  padding: 20px;
`;

export const Body = styled.div`
    width: 100%;
    height: ${document.documentElement.clientHeight}px;
    background: url('../images/p_12.jpg') center / cover no-repeat;
`;

export const Form = styled.form`
  width: 90%;
  padding: 20px;
`;

export const Input = styled.input.attrs(props => ({
  type: "text"
}))`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #565656;
`;

export const InputEmail = styled.input.attrs(props => ({
    type: "email"
}))`
    width: 90%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #565656;
`;

export const PasswordInput = styled.input.attrs(props => ({
    type: "password"
}))`
    width: 90%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #565656;
`;

interface IsColorBlock {
  readonly isBlock: boolean;
}

export const ColorBlock = styled.div<IsColorBlock>`
  display: ${props => props.isBlock ? 'block' : 'none'};
`;