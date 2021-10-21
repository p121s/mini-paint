import styled from 'styled-components';

export const Button = styled.button`
  width: 100px;
  height: 50px;
  background: blue;
  color: white;
  border-radius: 3px;
  border: none;
  margin: 20px;

  &:hover {
    background: lightblue;
    cursor: pointer;
  }
`;