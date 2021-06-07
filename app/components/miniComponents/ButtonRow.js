import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from './Button.js'

const Container = styled.div`
  height: 30px;
  width: fit-content;
  display: flex;
  flex-direction: row;
`

const ButtonRow = ( props ) => {
  const [select, setSelect] = useState(null)
  return (
    <Container>
    {
      props.labels.map((label, iter) => <Button onClick={() => {
        props.onClicks[iter]()
        setSelect(iter)
      }}
      style={iter==select ? {background: 'var(--secondaryDark)', color: 'white', border: '1px solid var(--secondaryLight)'} : {}}
      >{label}</Button>)
    }
    </Container>
  )
}

export default ButtonRow