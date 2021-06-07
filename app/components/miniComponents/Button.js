import React from 'react'
import styled from 'styled-components'


const Button = styled.button`
  display: inline-block; 
  background: var(--background);
  border: 1px solid var(--backgroundLight);
  border-radius: 5px;
  width: fit-content;
  font-weight: bold;
  margin: 3px;
  color: var(--text);
  :focus {
    outline: none;
  }
  :hover {
    color: var(--textLight);
    border: 3px solid var(--textLight);
    margin: 1px;
    
  }
  :active {
    color: white;
    background-color: var(--secondary);
  }
`

export default Button
