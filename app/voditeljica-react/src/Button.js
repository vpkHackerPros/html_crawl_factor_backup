import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  flex: 1;
  width: 380px;
  height: 60px;
  background-color: var(--textColor);
  border: none;
  border-radius: 8vh;
  margin: auto;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: black;
  color: var(--background);
  outline: none;
  padding: 15px;
  cursor: pointer;

  &: hover {
    transform: translateY(-2px);
  }
  &: active {
    transform: translateY(0px);
  }
`
export default Button
