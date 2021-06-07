import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Container from './miniComponents/GenUseContainer.js'
import PlayersDub from './gameComponents/PlayersDub.js'
import PickingCategory from './gameComponents/PickingCategory.js'
import QuestionPanel from './gameComponents/QuestionPanel.js'
import ThinkTimePanel from './gameComponents/ThinkTimePanel.js'
import ChosenAnswerPanel from './gameComponents/ChosenAnswerPanel.js'
import BallControl from './gameComponents/BallControl.js'
import AnswerCheck from './gameComponents/AnswerCheck.js'
import SumShow from './gameComponents/SumShow.js'
import ButtonRow from './miniComponents/ButtonRow.js'
import http_helper from './http_helper.js'
import TextInput from './miniComponents/TextInput.js'
import Button from './miniComponents/Button.js'
import ResetPanel from './gameComponents/ResetPanel.js'
import fetch from 'node-fetch'


const FirstRound = ( props ) => {
  const prizes = [100,10,500,20,300,30,1000,50,400,30,200,20,500,10]
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
        ]}/>
        <Button
          onClick={() => {
            fetch('http://localhost:4545/firstRoundLight')
          }}
        >LUČI + AUDIO uvod</Button>
        <h1>IZBIRA TEM OBA PARA</h1>
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
        <PickingCategory team={1} />
        <PickingCategory team={2}/>
        <h1>TEAM A - 1. vprašanje</h1>
        <QuestionPanel numberOfAns={2}  right={props.question[props.question.pravilen]} question={props.question.vprasanje} answers={getAnswersWithPriority(props.question.prednost, 2).map((ans, iter) => props.question[ans])} />
        <ButtonRow labels={['začasno vpr ven', 'začasno vpr out']} onClicks={[ () => fetch('http://localhost:4545/maskaIN'), () => fetch('http://localhost:4545/maskaOUT') ]} />
        <ChosenAnswerPanel />
        <BallControl money={props.money[0]} setMoney={props.setMoney[0]} setMoneyBefore={props.setMoneyBefore[0]} ballCount={1} prizes={prizes} onClicks={prizes.map((prize) => () => console.log(prize))}/>
        <ResetPanel />
        <SumShow before={props.moneyBefore[0]} after={props.money[0]} />
        <h1>TEAM B - 1. vprašanje</h1>
        <QuestionPanel numberOfAns={2} right={props.question[props.question.pravilen]} question={props.question.vprasanje} answers={getAnswersWithPriority(props.question.prednost, 2).map((ans, iter) => props.question[ans])} />
        <ButtonRow labels={['začasno vpr ven', 'začasno vpr out']} onClicks={[ () => fetch('http://localhost:4545/maskaIN'), () => fetch('http://localhost:4545/maskaOUT') ]} />
        <ChosenAnswerPanel />
        <BallControl money={props.money[1]} setMoney={props.setMoney[1]}  setMoneyBefore={props.setMoneyBefore[1]} ballCount={1} prizes={prizes} onClicks={prizes.map((prize) => () => console.log(prize))}/>
        <ResetPanel />
        <SumShow before={props.moneyBefore[1]} after={props.money[1]} />
        <h1>IZBIRA TEM OBA PARA</h1>
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
        <PickingCategory team={1} />
        <PickingCategory team={2}/>
        <h1>TEAM A - 2. vprašanje</h1>
        <QuestionPanel numberOfAns={2} question={props.question.vprasanje} right={props.question[props.question.pravilen]}answers={getAnswersWithPriority(props.question.prednost, 2).map((ans, iter) => props.question[ans])} />
        <ButtonRow labels={['začasno vpr ven', 'začasno vpr out']} onClicks={[ () => fetch('http://localhost:4545/maskaIN'), () => fetch('http://localhost:4545/maskaOUT') ]} />
        <ChosenAnswerPanel />
        <BallControl ballCount={2} money={props.money[0]} setMoney={props.setMoney[0]}  setMoneyBefore={props.setMoneyBefore[0]} ballCount={2} prizes={prizes} onClicks={prizes.map((prize) => () => console.log(prize))}/>
        <ResetPanel />
        <SumShow before={props.moneyBefore[0]} after={props.money[0]} />
        <h1>TEAM B - 2. vprašanje</h1>
        <QuestionPanel numberOfAns={2} question={props.question.vprasanje} right={props.question[props.question.pravilen]}answers={getAnswersWithPriority(props.question.prednost, 2).map((ans, iter) => props.question[ans])} />
        <ButtonRow labels={['začasno vpr ven', 'začasno vpr out']} onClicks={[ () => fetch('http://localhost:4545/maskaIN'), () => fetch('http://localhost:4545/maskaOUT') ]} />
        <ChosenAnswerPanel />
        <BallControl ballCount={2} money={props.money[1]} setMoney={props.setMoney[1]}   setMoneyBefore={props.setMoneyBefore[1]} ballCount={2} prizes={prizes} onClicks={prizes.map((prize) => () => console.log(prize))}/>
        <ResetPanel />
        <SumShow before={props.moneyBefore[1]} after={props.money[1]} />
        <h1>IZBIRA TEM OBA PARA</h1>
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

        <PickingCategory team={1} />
        <PickingCategory team={2}/>
        <h1>TEAM A - 3. vprašanje</h1>
        <QuestionPanel numberOfAns={2} question={props.question.vprasanje} right={props.question[props.question.pravilen]}answers={getAnswersWithPriority(props.question.prednost, 2).map((ans, iter) => props.question[ans])} />
        <ButtonRow labels={['začasno vpr ven', 'začasno vpr out']} onClicks={[ () => fetch('http://localhost:4545/maskaIN'), () => fetch('http://localhost:4545/maskaOUT') ]} />
        <ChosenAnswerPanel />
        <BallControl ballCount={3} money={props.money[0]} setMoney={props.setMoney[0]}  setMoneyBefore={props.setMoneyBefore[0]} ballCount={3} prizes={prizes} onClicks={prizes.map((prize) => () => console.log(prize))}/>
        <ResetPanel />
        <SumShow before={props.moneyBefore[0]} after={props.money[0]} />
        <h1>TEAM B - 3. vprašanje</h1>
        <QuestionPanel numberOfAns={2} question={props.question.vprasanje} right={props.question[props.question.pravilen]}answers={getAnswersWithPriority(props.question.prednost, 2).map((ans, iter) => props.question[ans])} />
        <ButtonRow labels={['začasno vpr ven', 'začasno vpr out']} onClicks={[ () => fetch('http://localhost:4545/maskaIN'), () => fetch('http://localhost:4545/maskaOUT') ]} />
        <ChosenAnswerPanel />
        <BallControl ballCount={3} money={props.money[1]} setMoney={props.setMoney[1]}  setMoneyBefore={props.setMoneyBefore[1]} ballCount={3} prizes={prizes} onClicks={prizes.map((prize) => () => console.log(prize))}/>
        <ResetPanel />
        <SumShow before={props.moneyBefore[1]} after={props.money[1]} />
        <ButtonRow labels={['final scores IN', 'final scores OUT']} onClicks={[
          () => fetch(`http://localhost:4545/duelScore/${props.money[0]}/${props.money[1]}`),
          () => fetch(`http://localhost:4545/duelScoreOut`),
        ]} />
    </>
  )
}

export default FirstRound