import React, {useState, useEffect, useCallback} from 'react'
import styled  from 'styled-components'
import FileSelector from './FileSelector'
import fs from 'fs'
import Button from './Button.js'
import PopUp from './PopUp.js'

export default function CrawlLoad(props){
  const [crawlPath, setCrawlPath] = useState(' ')
  const [inputIter, setInputIter] = useState(0)
  const [questions, setQuestions] = useState([])
  const [selected, setSelected] = useState(0)

  const sendCrawl = () => {
    console.log('CRAWL PATH' + crawlPath)
    console.log('refreshing crawl')
    fetch('http://localhost:4545/questionsFile', {
      method: 'POST',
      body: JSON.stringify({
        path: crawlPath
      }),
      headers: {'Content-Type': 'application/json'},
    })
  }
  const getQuestions = () => {
    console.log(crawlPath)
    console.log('refreshing crawl')
    fetch('http://localhost:4545/questionsFile', {

    })
  }

  const onInput = () => {
    setInputIter(inputIter + 1)
  }

  const updateQuestions = () => {
    sendCrawl()
    setTimeout(() => {
      fetch('http://localhost:4545/questions')
        .then( res => res.json())
        .then(questions => {
          setQuestions(questions.questions)
        })
    }, 200)
  }

  useEffect(() => {
    sendCrawl()
    updateQuestions()
    console.log(crawlPath)
  }, [inputIter])

  const Container = styled.div`
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding: 5px;
  `
  const Question = styled.button`
    text-align: left;
    width: 100%;
    display: block; 
    background: var(--background);
    border: 1px solid var(--backgroundLight);
    border-radius: 5px;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 5px;
    color: var(--backgroundLight);
    :focus {
      outline: none;
    }
    :hover {
      background: var(--textDark);
      color: var(--background);
    }
    :active {
      background-color: var(--background);
      color: white;
    }
  `
  const Selected = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: block; 
    background: var(--secondary);
    border: 1px solid var(--secondaryLight);
    border-radius: 5px;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 5px;
    color: white;
    padding: 3px;
  `
  useEffect(() => {
    try {
      props.setQuestion(questions[selected].referenca)
    } catch {

    }
  }, [crawlPath, questions, selected])

  return(
    <Container>
      <span>
        <FileSelector id={props.id} onInput={onInput} setPath={setCrawlPath} path={crawlPath}/>
      </span>
      {
        questions.map((question, iter) => {
          return iter == selected
            ? <Selected>{`${question.st}  -> ${question.vprasanje}`}</Selected> 
            : <Question onClick={() => setSelected(iter)}>{`${question.st}  -> ${question.vprasanje}`}</Question>
        })
      }    
    </Container>
  )
}
