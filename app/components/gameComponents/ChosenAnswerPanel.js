import React from 'react'
import styled from 'styled-components'
import ButtonRow from '../miniComponents/ButtonRow.js'
import Container from '../miniComponents/GenUseContainer.js'


const ChosenAnswerPanel = ( props ) => {
  return (
    <Container>
      <ButtonRow labels={['odgovor A', 'odgovorB']} onClicks={[ () => fetch('http://localhost:4545/answerSelect/1'), () => fetch('http://localhost:4545/answerSelect/2') ]} />
    </Container>
  )
}


export default ChosenAnswerPanel