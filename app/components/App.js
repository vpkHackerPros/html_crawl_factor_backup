import './App.css';
import styled, { createGlobalStyle} from 'styled-components'
import React, {useEffect, useState} from 'react'
import FirstRound from './FirstRound.js'
import SecondRound from './SecondRound.js'
import ThirdRound from './ThirdRound.js'
import FourthRound from './FourthRound.js'
import ButtonRow from './miniComponents/ButtonRow.js'
import SelectQuestion from './SelectQuestion.js'
import CrawlLoad from './miniComponents/CrawlLoad.js'
import { app } from 'electron';
import Money from './gameComponents/Money.js'
import TextInput from './miniComponents/TextInput.js'
import HttpHelper from './http_helper.js'

const GlobalStyle = createGlobalStyle`
  html { 
    --background: #25283D;
    --backgroundLight: #676EA2;
    --backgroundDark: #202232;
    --text: #D08AC8;
    --textLight: #EED3EA;
    --textDark: #8F3985;
    --main: #98DFEA;
    --mainLight: #EEFAFC;
    --mainDark: #2FC1DA;
    --secondary: #FFA62B;
    --secondaryLight: #FFCC85;
    --secondaryDark: #F58F00;
    padding: 0px;
    margin: 0px;
  }
  body {
    box-sizing: border-box;
    height: 100vh;
    width: 100vw;
    background-color: var(--backgroundDark);
    font-family:  'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color: var(--text);
    margin: 0px;
  }
`
const Container = styled.div`
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 10vh auto;
  grid-template-columns: 60% 40%;
`

const GameControls = styled.div`
  grid-row: 2/3;
  grid-column: 1/2;
  overflow-y: scroll;
    scrollbar-color: var(--background);
    ::-webkit-scrollbar {
        width: 22px;
    }
    ::-webkit-scrollbar-track {
        background: var(--background);
        border: 1px solid var(--backgroundLight);
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: var(--secondaryDark);
        border: 1px solid var(--secondaryLight);
    }
`
const QuestionControls = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
    scrollbar-color: var(--background);
    ::-webkit-scrollbar {
        width: 22px;
    }
    ::-webkit-scrollbar-track {
        background: var(--backgroundDark);
        border: 1px solid var(--backgroundLight);
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: var(--secondaryDark);
        border: 1px solid var(--secondaryLight);
    }
`
const TopContainer = styled.div`
box-sizing: border-box;
  grid-row: 1/2;
  grid-column: 1/3;
  height: 100%;
  width: 100%;
  border-bottom: 3px solid var(--secondary);
  overflow-y: scroll;
    scrollbar-color: var(--background);
    ::-webkit-scrollbar {
        width: 22px;
    }
    ::-webkit-scrollbar-track {
        background: var(--backgroundDark);
        border: 1px solid var(--backgroundLight);
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: var(--secondaryDark);
        border: 1px solid var(--secondaryLight);
    }
`


function App() {
  const [gameProgress, setGameProgress] = useState(0)
  const [currentQuestionRef, setCurrentQuestionRef] = useState('')
  const [questionFromDB, setQuestionFromDB] = useState({})
  const [moneyTeamABefore, setMoneyTeamABefore] = useState(0)
  const [moneyTeamA, setMoneyTeamA] = useState(0)
  const [moneyTeamBBefore, setMoneyTeamBBefore] = useState(0)
  const [moneyTeamB, setMoneyTeamB] = useState(0)
  const [teamAStaying, setTeamAStaying] = useState(false)
  const [names, setNames] = useState({first1: '', first2: '', second1: '', second2: ''})
  const setName = (name, key)  => {
    setNames({ ... names, [key]: name})
  }
  const [topics, setTopics] = useState({first: '', second: ''})
  const [iter, setIter] = useState(0)
  const setTopic = (topic, key)  => {
    setTopics({ ... topics, [key]: topic})
  }
  const [topic01, setTopic01] = useState('')
  const [topic02, setTopic02] = useState('')
  const [topic03, setTopic03] = useState('')
  const [topic04, setTopic04] = useState('')
  const [topic05, setTopic05] = useState('')
  const [topic06, setTopic06] = useState('')
  const [topic11, setTopic11] = useState('')
  const [topic12, setTopic12] = useState('')
  const [topic13, setTopic13] = useState('')
  const [topic14, setTopic14] = useState('')
  const [topic15, setTopic15] = useState('')
  const [topic16, setTopic16] = useState('')
  const [topic21, setTopic21] = useState('')
  const [topic22, setTopic22] = useState('')
  const [topic23, setTopic23] = useState('')
  const [topic24, setTopic24] = useState('')
  const [topic25, setTopic25] = useState('')
  const [topic26, setTopic26] = useState('')
  const [topic27, setTopic27] = useState('')
  const [topic28, setTopic28] = useState('')

  useEffect(() => {
    console.log('sending data')
    HttpHelper.sendData('gamedata', {topics: [topics.first, topics.second], names: [names.first1, names.first2, names.second1, names.second2]})
  }, [topics, names, iter])

  const gameStages = [
    <FirstRound 
      topic1={topic01} setTopic1={setTopic01}
      topic2={topic02} setTopic2={setTopic02}
      topic3={topic03} setTopic3={setTopic03}
      topic4={topic04} setTopic4={setTopic04}
      topic5={topic05} setTopic5={setTopic05}
      topic6={topic06} setTopic6={setTopic06}
      setIter={setIter} topics={topics} setTopic={setTopic} question={questionFromDB} money={[moneyTeamA, moneyTeamB]} 
      setMoney={[setMoneyTeamA, setMoneyTeamB]} moneyBefore={[moneyTeamABefore, moneyTeamBBefore]} 
      setMoneyBefore={[setMoneyTeamABefore, setMoneyTeamBBefore]} 
    />, 
    <SecondRound 
      topic1={topic11} setTopic1={setTopic11}
      topic2={topic12} setTopic2={setTopic12}
      topic3={topic13} setTopic3={setTopic13}
      topic4={topic14} setTopic4={setTopic14}
      topic5={topic15} setTopic5={setTopic15}
      topic6={topic16} setTopic6={setTopic16}
      question={questionFromDB} topics={topics} setTopic={setTopic}money={teamAStaying ? moneyTeamA : moneyTeamB} 
      setMoney={teamAStaying ? setMoneyTeamA : setMoneyTeamB}  moneyBefore={teamAStaying ? moneyTeamABefore : moneyTeamBBefore} 
      setMoneyBefore={teamAStaying ? setMoneyTeamABefore : setMoneyTeamBBefore}
    />, 
    <ThirdRound 
      topic1={topic21} setTopic1={setTopic21}
      topic2={topic22} setTopic2={setTopic22}
      topic3={topic23} setTopic3={setTopic23}
      topic4={topic24} setTopic4={setTopic24}
      topic5={topic25} setTopic5={setTopic25}
      topic6={topic26} setTopic6={setTopic26}
      topic7={topic27} setTopic7={setTopic27}
      topic8={topic28} setTopic8={setTopic28}
      topics={topics} setTopic={setTopic}names={teamAStaying ? [names.first1, names.first2]: [names.second1, names.second2]} 
      question={questionFromDB} money={teamAStaying ? moneyTeamA : moneyTeamB} setMoney={teamAStaying ? setMoneyTeamA : setMoneyTeamB}  
      moneyBefore={teamAStaying ? moneyTeamABefore : moneyTeamBBefore} setMoneyBefore={teamAStaying ? setMoneyTeamABefore : setMoneyTeamBBefore}
    />, 
    <FourthRound 
      question={questionFromDB} topics={topics} setTopic={setTopic}money={teamAStaying ? moneyTeamA : moneyTeamB} 
      setMoney={teamAStaying ? setMoneyTeamA : setMoneyTeamB}  moneyBefore={teamAStaying ? moneyTeamABefore : moneyTeamBBefore} 
      setMoneyBefore={teamAStaying ? setMoneyTeamABefore : setMoneyTeamBBefore}
    />, 
  ]
  const makeQuestion = (a='', b='', c='', d='', izgovorjava='', pravilen='', prednost='', 
    razlaga='', referenca='', teme='', uporabljen='', vprasanje='') => {
    return {
      a,
      b,
      c,
      d,
      izgovorjava,
      pravilen,
      prednost,
      razlaga,
      referenca,
      teme,
      uporabljen,
      vprasanje,
    }
  }
  useEffect(() => {
    console.log(currentQuestionRef)
    fetch(`http://localhost:4545/currentQuestion/${currentQuestionRef}`)
      .then(res => res.json())
      .then(body => {
        try {
          console.log(body[0].vprasanje)
          setQuestionFromDB(makeQuestion(body[0].a, body[0].b, body[0].c, body[0].d, 
            body[0].izgovorjava, body[0].pravilen, body[0].prednost, body[0].razlaga, 
            body[0].referenca, body[0].teme, body[0].uporabljen, body[0].vprasanje))
        } catch {
          setQuestionFromDB(makeQuestion())
        }
      })
  }, [currentQuestionRef])
  useEffect(() => {
    fetch(`http://localhost:4545/stage/${gameProgress}`)
  }, [gameProgress])

  return (
    <>
      <GlobalStyle />
      <Container>
        <TopContainer>
          <span><ButtonRow labels={['krog 1', 'krog 2', 'krog 3', 'krog 4']} onClicks={[ () => setGameProgress(0), () => setGameProgress(1), () => setGameProgress(2), () => setGameProgress(3) ]} /></span>
          <span>prvi par</span>
          <TextInput value={names.first1} setValue={(value) => setName(value, 'first1')} />,
          <TextInput value={names.first2} setValue={(value) => setName(value, 'first2')} />
          <span>drugi par</span>
          <TextInput value={names.second1} setValue={(value) => setName(value, 'second1')} />,
          <TextInput value={names.second2} setValue={(value) => setName(value, 'second2')} />
          <span>temi</span>
          <TextInput value={topics.first} setValue={(value) => setTopic(value, 'first')} />,
  <TextInput value={topics.second} setValue={(value) => setTopic(value, 'second')} />
        </TopContainer>
        <QuestionControls>
          <div>
            <ButtonRow labels={['ostane prvi par', 'ostane drugi par']} onClicks={[ () => setTeamAStaying(true), () => setTeamAStaying(false) ]} />
            <Money 
              moneyBeforeA={moneyTeamABefore} moneyBeforeB={moneyTeamBBefore}
              setMoneyBeforeA={setMoneyTeamABefore} setMoneyBeforeB={setMoneyTeamBBefore}
              moneyTeamA={moneyTeamA} moneyTeamB={moneyTeamB} 
              setMoneyTeamA={setMoneyTeamA} setMoneyTeamB={setMoneyTeamB} ></Money>
          </div>
          <CrawlLoad id={'test'} question={currentQuestionRef} setQuestion={setCurrentQuestionRef} />
        </QuestionControls>
        <GameControls>
          { gameStages[gameProgress] }
        </GameControls>
      </Container>
    </>
  );
}

export default App;
