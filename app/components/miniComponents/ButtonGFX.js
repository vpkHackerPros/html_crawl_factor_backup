import React from 'react'
import styled from 'styled-components'


const Button = styled.button`
  display: inline-block; 
  background: none;
  border: 2px solid var(--text);
  background: red;
  border-radius: 5px;
  width: fit-content;
  font-weight: bold;
  margin: 3px;
  color: white;
  display: inline-block;
  :focus {
    outline: none;
  }
  :hover {
    color: white;
    background-color: red;
  }
  :active {
    color: white;
    background-color: var(--text);
  }
`

function GfxButton (props) {
  return (
    <Button onClick={props.onClick} >GFX</Button>
  )
}

export default GfxButton
