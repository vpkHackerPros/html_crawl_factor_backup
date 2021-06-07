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
import HoleSelector from './gameComponents/HoleSelector.js'
import ButtonRow from './miniComponents/ButtonRow.js'
import Button from './miniComponents/Button.js'
import fetch from 'node-fetch'


const NumberInput = styled.input`
  height: 30px;
  width: 50px;
  display: inline-block;
  color: white;
  background: var(--backgroundDark);
  border: 1px solid var(--backgroundLight);
  border-radius: 5px;
  margin-left: 20px;
`
const SecondRound = ( props ) => {
  const [rightCount, setRightCount] = useState(0)
  const [moneyBall, setMoneyBall] = useState(0)
  const [moneyOffer, setMoneyOffer] = useState(0)
  const prizes0 = [0,
    props.money * 0.5, 0 ,
    props.money * 0.5, 0,
    props.money, props.money, props.money, props.money,0,
    props.money * 0.5, 0,
    props.money * 0.5, 0]
  const prizes1 = [0,
    props.money * 0.5, 0 ,
    props.money * 2, 0,
    props.money, props.money, props.money, props.money,0,
    props.money * 0.5, 0,
    props.money * 0.5, 0]
  const prizes2 = [0,
    props.money * 0.5, 0 ,
    props.money * 2, 0,
    props.money, props.money, props.money, props.money,0,
    props.money * 0.5, 0,
    props.money * 2, 0]
  const prizes3 = [0,
    props.money * 0.5, 0 ,
    props.money * 2, 0,
    props.money, props.money, props.money, props.money,0,
    props.money * 2, 0,
    props.money * 2, 0]
  const prizes4 = [0,
    props.money * 2, 0 ,
    props.money * 2, 0,
    props.money, props.money, props.money, props.money,0,
    props.money * 2, 0,
    props.money * 2, 0]

  const [prizes, setPrizes] = useState(prizes0)
  const [ballMoney, setBallMoney] = useState(0)
  useEffect(() => {
    switch(rightCount) {
      case 0: setPrizes(prizes0)
      case 1: setPrizes(prizes1)
      case 2: setPrizes(prizes2)
      case 3: setPrizes(prizes3)
      case 4: setPrizes(prizes4)
      default: setPrizes(prizes0)
    }
  }, [rightCount])

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
        <ButtonRow labels={['0 prav', '1 prav', '2 prav', '3 prav', '4 prav']} onClicks={[
          () => setPrizes(prizes0),
          () => setPrizes(prizes1),
          () => setPrizes(prizes2),
          () => setPrizes(prizes3),
          () => setPrizes(prizes4)
        ]} />
        {
          prizes.map(prize => <Button onClick={() => {
            setMoneyBall(prize)
            props.setMoney(prize)
          }
          }>{prize}</Button>)
        }
        <p>ponudba</p>
        <NumberInput type="number" value={props.moneyOffer} onChange={ event => setMoneyOffer(event.target.value)} min={0} />
        <ButtonRow labels={['send finale', 'show finale', 'finale OUT']} onClicks={[
          () => {
            fetch(`http://localhost:4545/finale/${moneyOffer}/${moneyBall}`)
            console.log('finale')
          },
          () => {
            fetch(`http://localhost:4545/finaleShow`)
          },
          () => {
            fetch(`http://localhost:4545/finaleOut`)
          }
        ]}
        />

    </>
  )
}

export default SecondRound
