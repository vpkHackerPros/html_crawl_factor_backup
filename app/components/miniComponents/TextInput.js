import React from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenAlt } from '@fortawesome/free-solid-svg-icons'

const TextInputStyled = styled.input`
  background:none;
  border: none;
  display: inline-block;
  font-size: 14px;
  width: 120px;
  color: var(--secondaryLight);
  padding: 3px;

  :focus {
    outline: none;
    font-weight: bold;
  }
`

const Container = styled.div`
  color: var(--secondary);
  margin: 3px;
  padding-top: 15px;
  width: ${props => props.width};
  border: none;
  border-bottom: 1px solid var(--secondary);
  display: inline-block;


`

function TextInput (props) {
  return(
    <Container width={"fit-content"}>
      <TextInputStyled value={props.value} onChange={ event => props.setValue(event.target.value)}></TextInputStyled>



    </Container>
  )
}

export default TextInput