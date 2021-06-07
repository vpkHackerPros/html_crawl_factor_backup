import React, { useEffect } from 'react'
import styled from 'styled-components'
import Container from '../miniComponents/GenUseContainer.js'
import Button from '../miniComponents/Button.js'


const Question = styled.div`
  font-size: 18px;
  font-weight: bold;
`
const Answer = styled.div`
  font-size: 16px;
  font-weight: lighter;
`
const QuestionPanel = ( props ) => {
  return (
    <Container>
      <Question>{props.question}</Question>
      {
        props.answers.map((answer, iter) => <Answer>{answer}</Answer>)
      }
      <p><span style={{fontSize: '12px'}}>pravi odgovor:</span> {props.right}</p>
      <Button onClick={() => fetch(`http://localhost:4545/sendQuestion/${props.numberOfAns}`)}>pošlji podatke</Button>
      <Button onClick={() => fetch(`http://localhost:4545/questionNext`)}>naslednji GFX IN</Button>
      <Button onClick={() => fetch(`http://localhost:4545/showCorrect`)}>pokaži pravilen odgovor</Button>
      <Button onClick={() => fetch(`http://localhost:4545/gfxOut`)}>GFX OUT</Button>
    </Container>
  )
}


export default QuestionPanel
