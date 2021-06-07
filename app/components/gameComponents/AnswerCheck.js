import React from 'react'
import styled from 'styled-components'
import Button from '../miniComponents/Button.js'
import ButtonRow from '../miniComponents/ButtonRow.js'
import Container from '../miniComponents/GenUseContainer.js'

const AnswerCheck = ( props ) => {
  return (
    <Container>
      <ButtonRow labels={[ 'pravilno', 'narobe' ]} onClicks={[ () => console.log('pravilno'),  () => console.log('narobe') ]} />
      <Button>MODRA LUČ</Button>
    </Container>
  )
}


export default AnswerCheck
