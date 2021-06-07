import React, { useState } from 'react'
import styled, {createGlobalStyle} from 'styled-components'

const ButtonSelected = styled.button`
  border: none;
  margin: 20px;
  padding: 5px;
  outline: none;
  border-radius: 15px;
  background: #DDDDDD;
  box-shadow: -6px -6px 6px 3px rgba(0,0,0,0.28),
  6px 6px 6px 3px rgba(255,255,255,1);
`
const ButtonNotSelected = styled.button`
  border: none;
  margin: 20px;
  outline: none;
  padding: 5px;
  background: #DDDDDD;
  border-radius: 15px;
  box-shadow: 6px 6px 6px 3px rgba(0,0,0,0.28),
  -6px -6px 6px 3px rgba(255,255,255,1);
`

function SelectButton (props) {
  if (props.number == props.show) return (
    <ButtonSelected>{props.children}</ButtonSelected>
  ) 
  else return (
    <ButtonNotSelected onClick={props.onClick}>{props.children}</ButtonNotSelected>
  )
}
export default SelectButton
