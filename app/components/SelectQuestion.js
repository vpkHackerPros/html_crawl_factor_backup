import React from 'react'
import styled from 'styled-components'

const TextInputStyled = styled.input`
  background:none;
  border: none;
  display: inline-block;
  font-size: 14px;
  width: 200px;
  :focus {
    outline: none;
    font-weight: bold;
  }
`

const SelectQuestion = (props) => {
  return (
    <TextInputStyled  type={'number'}/>
  )
}

export default SelectQuestion