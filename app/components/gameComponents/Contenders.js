import React, {useState} from 'react'
import styled from 'styled-components'
import TextInput from './TextInput.js'
import Panel from './Panel.js'

const TeamData = styled.div`
  padding-top: 15px;
  font-weight: bold;
`
const Button = styled.button`
  display: inline-block; 
  background: none;
  border: 2px solid var(--shadow);
  border-radius: 5px;
  width: 80px;
  font-weight: bold;
  margin: 3px;
  color: var(--text);

`


export default function (props) {
  const [money, setMoney] = useState([0,0])
  return (
    <Panel>
      <TeamData>TEAM A : {money[0]}‎€</TeamData>
      <Button onClick={() => setMoney([money[0] - props.moneyInGame, money[1]])}>- {props.moneyInGame}€</Button>
      <Button onClick={() => setMoney([money[0] + props.moneyInGame, money[1]])}>+ {props.moneyInGame}€</Button>
      <TextInput />
      <TextInput />
      <TeamData>TEAM B : {money[1]}‎€</TeamData>
      <Button onClick={() => setMoney([money[0], money[1] - props.moneyInGame])}>- {props.moneyInGame}€</Button>
      <Button onClick={() => setMoney([money[0], money[1] + props.moneyInGame])}>+ {props.moneyInGame}€</Button>
      <TextInput />
      <TextInput />
    </Panel>
  )
}