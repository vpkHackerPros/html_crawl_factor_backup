import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../miniComponents/Button.js'
import ButtonRow from '../miniComponents/ButtonRow.js'
import Container from '../miniComponents/GenUseContainer.js'
import MiniLabel from '../miniComponents/MiniLabel.js'
import AnswerCheck from './AnswerCheck.js'

const BallControl = ( props ) => {
  const [moneyInGame, setMoneyInGame] = useState([0,0,0])
  const [isColored, setIsColored] = useState(0)

  const setMoneyForBall = (order, prize) => {
    let inGame = moneyInGame
    inGame[order] = prize
    setMoneyInGame(inGame)
    console.log(inGame)
  }

  const OneBallControl = ( props ) => <>
      <ButtonRow labels={props.prizes} onClicks={props.prizes.map((prize, iter) => () => {
        props.setMoney(props.order, prize)
        fetch(`http://localhost:4545/ballDropNeutral/${iter}/${isColored}/${prize}`)
      })}/>
  </>
  return (
    <Container>
      <MiniLabel>za prvo rundo -> najprej padejo žoge, potem preveriš</MiniLabel>
      <ButtonRow labels={[ 'prištej + zel', 'odštej + rd' ]}
        onClicks={[
          () => {
            props.setMoneyBefore(props.money)
            props.setMoney(
              Number(props.money) + Number(moneyInGame.reduce((a, b) => a + b, 0)) > 0
              ? Number(props.money) + Number(moneyInGame.reduce((a, b) => a + b, 0))
              : 0
            )
            fetch('http://localhost:4545/result/true')
          },
          () => {
            props.setMoneyBefore(props.money)
            props.setMoney(
              Number(props.money) - Number(moneyInGame.reduce((a, b) => a + b, 0)) > 0
              ? Number(props.money) - Number(moneyInGame.reduce((a, b) => a + b, 0))
              : 0
           )
            fetch('http://localhost:4545/result/false')
          }
        ]}
      />
      <MiniLabel>za ostale -> najprej preveriš nato padejo žoge</MiniLabel>
      <ButtonRow labels={[ 'zelena', 'rdeča' ]}
        onClicks={[
          () => {
            setIsColored(1)
            fetch('http://localhost:4545/result/true')
          },
          () => {
            setIsColored(2)
            fetch('http://localhost:4545/result/false')
          }
        ]}
      />
      <ButtonRow labels={[ 'prištej', 'odštej' ]}
        onClicks={[
          () => {
            props.setMoneyBefore(props.money)
            //od prej
            //props.setMoney(Number(props.money) + Number(moneyInGame.reduce((a, b) => a + b, 0)))

            //popravek
            props.setMoney(
              Number(props.money) + Number(moneyInGame.reduce((a, b) => a + b, 0)) > 0
              ? Number(props.money) + Number(moneyInGame.reduce((a, b) => a + b, 0))
              : 0
            )
          },
          () => {
            props.setMoneyBefore(props.money)
            props.setMoney(
              Number(props.money) - Number(moneyInGame.reduce((a, b) => a + b, 0)) > 0
              ? Number(props.money) - Number(moneyInGame.reduce((a, b) => a + b, 0))
              : 0
           )
          }
        ]}
      />
      <MiniLabel>izbira barve oznake</MiniLabel>
      <ButtonRow labels={[ 'kontejner moder', 'kontejner zeler', 'kontejner rdec']} onClicks={[
        () => setIsColored(0),
        () => setIsColored(1),
        () => setIsColored(2)
      ]} />
      <MiniLabel>ostalo</MiniLabel>
      <ButtonRow labels={[ 'spust ANIM GFX', 'modro ozadje', 'resetiraj barve kontejnerjev', 'GFX OUT']} onClicks={[
            () => fetch('http://localhost:4545/ballDrop'),
            () => fetch('http://localhost:4545/backgroundNeutral'),
            () => fetch('http://localhost:4545/ballDropClear'),
            () => fetch('http://localhost:4545/ballDropVizOut'),
       ]} />
      <MiniLabel>ŽOGE PADAJO</MiniLabel>
      <MiniLabel>1.</MiniLabel><OneBallControl order={0} prizes={props.prizes} setMoney={setMoneyForBall}/>
      { props.ballCount > 1 ? <><MiniLabel>2.</MiniLabel><OneBallControl order={1}  prizes={props.prizes} setMoney={setMoneyForBall}/></> : ''}
      { props.ballCount > 2 ? <><MiniLabel>3.</MiniLabel><OneBallControl order={2}  prizes={props.prizes} setMoney={setMoneyForBall}/></> : ''}
      { props.ballCount > 3 ? <><MiniLabel>kazenska</MiniLabel><OneBallControl order={2}  prizes={props.prizes.map(prize => - prize)} setMoney={setMoneyForBall}/></> : ''}
    </Container>
  )
}


export default BallControl
