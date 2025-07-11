import styled from 'styled-components'
import { SpinnerContainer } from '../spinner/spinnerStyles';

export const BaseButton = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  padding: 0 20px; /* adjusted padding */
  font-size: 15px;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;


export const GoogleSignInButton = styled(BaseButton)`
 background-color: #4285f4;
    color: white;

    &:hover {
      background-color: #357ae8;
      border: none;
    }
`;

export const InvertedButton = styled(BaseButton)`
 background-color: white;
    color: black;
    border: 1px solid black;

    &:hover {
      background-color: black;
      color: white;
      border: none;
    }
`;

export const ButtonSpinner = styled(SpinnerContainer)`
width: 30px;
height: 30px;
`;