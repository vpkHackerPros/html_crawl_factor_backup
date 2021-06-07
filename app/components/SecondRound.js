import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Container from './miniComponents/GenUseContainer.js'
import PlayersDub from './gameComponents/PlayersDub.js'
import PickingCategory from './gameComponents/PickingCategory.js'
import QuestionPanel from './gameComponents/QuestionPanel.js'
import ChosenAnswerPanel from './gameComponents/ChosenAnswerPanel3ans.js'
import BallControl from './gameComponents/BallControl.js'
import AnswerCheck from './gameComponents/AnswerCheck.js'
import SumShow from './gameComponents/SumShow.js'
import HoleSelector from './gameComponents/HoleSelector.js'
import ButtonRow from './miniComponents/ButtonRow.js'
import TextInput from './miniComponents/TextInput.js'
import Button from './miniComponents/Button.js'
import ResetPanel from './gameComponents/ResetPanel.js'


const SecondRound = ( props ) => {

  /*
          TEMP VALUES -> tole mora pridet od drugje
   */
  const prizes = [300,10,1000,20,500,50,2000,50,500,50,300,20,1000,10]
  const [topic1, setTopic1] = useState('')
  const [topic2, setTopic2] = useState('')
  const [topic3, setTopic3] = useState('')
  const [topic4, setTopic4] = useState('')
  const [topic5, setTopic5] = useState('')
  const [topic6, setTopic6] = useState('')


  const getAnswersWithPriority = (priorityString, count) => {
    let outArr
    try {
      outArr = priorityString.slice(0, count).split('').sort()
    } catch {
      outArr = ['a', 'b', 'c', 'd']
    }
    return outArr
  }
  return (
    <>
        <ButtonRow labels={['start', 'nevtralno ozadje', 'zneski']} onClicks={[
          () => fetch('http://localhost:4545/init'),
          () => fetch('http://localhost:4545/backgroundNeutral'),
          () => fetch(`http://localhost:4545/zneski`, {
            method: 'POST',
            body: JSON.stringify(prizes),
            headers: {'Content-Type': 'application/json'},
          })
         ]}  />
        <h1>IZBIRA TEM</h1>
        <TextInput value={props.topic1} setValue={props.setTopic1} />
        <TextInput value={props.topic2} setValue={props.setTopic2} />
        <Button onClick={() => {
          props.setTopic(props.topic1, 'first')
          props.setIter(Date.now)
        }} >prepiši temo 1</Button>
        <Button onClick={() => {
          props.setTopic(props.topic2, 'second')
          props.setIter(Date.now)
        }} >prepiši temo 2</Button>
        <PickingCategory team={0}/>
        <h1>IZBIRA LUKENJ</h1>
        <HoleSelector />
        <h1>1. vprašanje</h1>
        <QuestionPanel numberOfAns={3}  right={props.question[props.question.pravilen]}question={props.question.vprasanje} answers={getAnswersWithPriority(props.question.prednost, 3).map((ans, iter) => props.question[ans])} />
        <ChosenAnswerPanel />
        <BallControl money={props.money} setMoney={props.setMoney} setMoneyBefore={props.setMoneyBefore} ballCount={3} prizes={prizes} onClicks={prizes.map((prize) => () => console.log(prize))}/>
        <ResetPanel />
        <SumShow before={props.moneyBefore} after={props.money} />
        <h1>IZBIRA TEM</h1>
        <TextInput value={props.topic3} setValue={props.setTopic3} />
        <TextInput value={props.topic4} setValue={props.setTopic4} />
        <Button onClick={() => {
          props.setTopic(props.topic3, 'first')
          props.setIter(Date.now)
        }} >prepiši temo 1</Button>
        <Button onClick={() => {
          props.setTopic(props.topic4, 'second')
          props.setIter(Date.now)
        }} >prepiši temo 2</Button>
        <PickingCategory team={0}/>
        <h1>IZBIRA LUKENJ</h1>
        <HoleSelector />
        <h1> 2. vprašanje</h1>
        <QuestionPanel numberOfAns={3} question={props.question.vprasanje} right={props.question[props.question.pravilen]}answers={getAnswersWithPriority(props.question.prednost, 3).map((ans, iter) => props.question[ans])} />
        <ChosenAnswerPanel />
        <BallControl  money={props.money} setMoney={props.setMoney}  setMoneyBefore={props.setMoneyBefore} ballCount={3} prizes={prizes} onClicks={prizes.map((prize) => () => console.log(prize))}/>
        <ResetPanel />
        <SumShow before={props.moneyBefore} after={props.money} />
        <h1>IZBIRA TEM</h1>
        <TextInput value={props.topic5} setValue={props.setTopic5} />
        <TextInput value={props.topic6} setValue={props.setTopic6} />
        <Button onClick={() => {
          props.setTopic(props.topic5, 'first')
          props.setIter(Date.now)
        }} >prepiši temo 1</Button>
        <Button onClick={() => {
          props.setTopic(props.topic6, 'second')
          props.setIter(Date.now)
        }} >prepiši temo 2</Button>
        <PickingCategory team={0} />
        <h1>IZBIRA LUKENJ</h1>
        <HoleSelector />
        <h1> 3. vprašanje</h1>
        <QuestionPanel numberOfAns={3} question={props.question.vprasanje} right={props.question[props.question.pravilen]}answers={getAnswersWithPriority(props.question.prednost, 3).map((ans, iter) => props.question[ans])} />
        <ChosenAnswerPanel />
        <BallControl money={props.money} setMoney={props.setMoney}  setMoneyBefore={props.setMoneyBefore} ballCount={3} prizes={prizes} onClicks={prizes.map((prize) => () => console.log(prize))}/>
        <ResetPanel />
        <SumShow before={props.moneyBefore} after={props.money} />
    </>
  )
}

export default SecondRound