import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CsvImport from './CrawlLoad.js'

const QuestionsDisplay => ( props ) => {
  return (
    {
      props.questions.map((question, iter) => {

      })
    }
  )
}


const QuestionsManager = (props) => {
  const [questions, setQuestions] = useState([{st: 1, referenca: 'test', vprasanje: 'asdf'}])
  return (
    <>
      <CsvImport />
      <QuestionSelector />
      <QuestionsDisplay />
    </>
  )
}



export default QuestionsManager