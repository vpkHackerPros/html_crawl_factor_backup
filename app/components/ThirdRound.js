import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Container from './miniComponents/GenUseContainer.js'
import PlayersDub from './gameComponents/PlayersDub.js'
import PickingCategory from './gameComponents/PickingCategory.js'
import QuestionPanel from './gameComponents/QuestionPanel3.js'
import ChosenAnswerPanel from './gameComponents/ChosenAnswerPanel4ans.js'
import BallControl from './gameComponents/BallControl.js'
import AnswerCheck from './gameComponents/AnswerCheck.js'
import SumShow from './gameComponents/SumShow.js'
import HoleSelector from './gameComponents/HoleSelector.js'
import HoleSelectorPenalty from './gameComponents/HoleSelectorPenalty.js'
import ButtonRow from './miniComponents/ButtonRow.js'
import TextInput from './miniComponents/TextInput.js'
import Button from './miniComponents/Button.js'
import ResetPanel from './gameComponents/ResetPanel.js'


const SecondRound = ( props ) => {

  /*
          TEMP VALUES -> tole mora pridet od drugje
   */
  const prizes = [500,10,3000,20,1000,50,2000,100,1000,50,250,20,1500,10]
  const [topic1, setTopic1] = useState('')
  const [topic2, setTopic2] = useState('')
  const [topic3, setTopic3] = useState('')
  const [topic4, setTopic4] = useState('')
  const [topic5, setTopic5] = useState('')
  const [topic6, setTopic6] = useState('')
  const [topic7, setTopic7] = useState('')
  const [topic8, setTopic8] = useState('')


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
        <ButtonRow labels={['start', 'nevtralno ozadje']} onClicks={[
            () => fetch('http://localhost:4545/init'),
            () => fetch('http://localhost:4545/backgroundNeutral')
         ]}  />
        <ButtonRow labels={['imena', 'zneski']} onClicks={[
          () => fetch(`http://localhost:4545/zneski`, {
            method: 'POST',
            body: JSON.stringify([props.names[0], props.names[1],
              props.names[0], props.names[1],
              props.names[0], props.names[1],
              props.names[0], props.names[1],
              props.names[0], props.names[1],
              props.names[0], props.names[1],
              props.names[0], props.names[1],
              props.names[0], props.names[1]
            ]),
            headers: {'Content-Type': 'application/json'},
          }),
          () => fetch(`http://localhost:4545/zneski`, {
            method: 'POST',
            body: JSON.stringify(prizes),
            headers: {'Content-Type': 'application/json'},
          })
         ]}  />
        <ButtonRow labels={['VIDEO IN', 'VIDEO OUT']} onClicks={[
          () => fetch('http://localhost:4545/videoIn'),
          () => fetch('http://localhost:4545/videoOut')
        ]} />
        <h1>IZBIRA TEM</h1>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
          <TextInput value={props.topic7} setValue={props.setTopic7} />
          <TextInput value={props.topic8} setValue={props.setTopic8} />
          <Button onClick={() => {
            props.setTopic(props.topic7, 'first')
            props.setIter(Date.now)
          }} >prepiši temo 1</Button>
          <Button onClick={() => {
            props.setTopic(props.topic8, 'second')
            props.setIter(Date.now)
          }} >prepiši temo 2</Button>
        </div>
        <PickingCategory team={0}/>
        <h1>IZBIRA LUKENJ</h1>
        <HoleSelector />
        <h1>IZBIRA KAZENSKE</h1>
        <HoleSelectorPenalty />
        <h1>1. vprašanje</h1>
        <QuestionPanel numberOfAns={4} right={props.question[props.question.pravilen]} question={props.question.vprasanje} answers={getAnswersWithPriority(props.question.prednost, 4).map((ans, iter) => props.question[ans])} />
        <ButtonRow labels={['izbriši A', 'izbriši B', 'izbriši C', 'izbriši D']}
          onClicks={[
            () => fetch('http://localhost:4545/deleteOneAnswer/1'),
            () => fetch('http://localhost:4545/deleteOneAnswer/2'),
            () => fetch('http://localhost:4545/deleteOneAnswer/3'),
            () => fetch('http://localhost:4545/deleteOneAnswer/4')
          ]}
        />
        <ChosenAnswerPanel />
        <BallControl money={props.money} setMoney={props.setMoney} setMoneyBefore={props.setMoneyBefore} ballCount={4} prizes={prizes} onClicks={prizes.map((prize) => () => console.log(prize))}/>
        <ResetPanel />
        <SumShow before={props.moneyBefore} after={props.money} />
    </>
  )
}

export default SecondRound
