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
      <p>pravi odgovor {props.right}</p>
      <Button onClick={() => fetch(`http://localhost:4545/sendQuestion3/${props.numberOfAns}`)}>pošlji podatke</Button>
      <Button onClick={() => fetch(`http://localhost:4545/questionNext3`)}>naslednji GFX IN</Button>
      <Button onClick={() => fetch(`http://localhost:4545/showCorrect3`)}>pokaži pravilen odgovor</Button>
      <Button onClick={() => fetch(`http://localhost:4545/gfxOut`)}>GFX OUT</Button>
    </Container>
  )
}


export default QuestionPanel
