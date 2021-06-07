import './App.css'
import React, { useState, useEffect } from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import useInterval from './useInterval'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #333333;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`
const Question = styled.h1`
  box-sizing: border-box;
  padding: 20px;
  color: white;
  margin: 30px;
`
const Title = styled.h1`
  box-sizing: border-box;
  padding: 20px;
  color: white;
  margin: 30px;
`


function App() {
  const [questions, setQuestions] = useState({first: '', second: ''})
  const [answers, setAnswers] = useState({first: '', second: ''})
  const [clock, setClock] = useState(0)
  useInterval(() => {
    fetch(`${window.location.origin.toString()}/currentQuestion`)
      .then( res => res.json())
      .then( data => {
        setQuestions({first: data.questionFirst, second: data.questionSecond, main: data.questionMain})
        setAnswers({first: data.answerFirst, second: data.answerSecond, main: data.answerMain})
        setClock(data.clock)
      })
  },100)
  
  return (
    <>
      <GlobalStyle />
      <Title>{`ura: ${clock}`}</Title>
      <Question>{'1. vprasanje: ' + questions.first}</Question>
      <Question>{'odgovor: ' + answers.first}</Question>
      <br />
      <br />
      <Question>{'2. vprasanje: ' + questions.second}</Question>
      <Question>{'odgovor: ' + answers.second}</Question>
      <br />
      <br />
      <Question>{'glavno vprasanje: ' + questions.main}</Question>
      <Question>{'odgovor: ' + answers.main}</Question>
    </>
  )
}

export default App
