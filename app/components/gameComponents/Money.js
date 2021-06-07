import { isExtraneousPopstateEvent } from 'history/DOMUtils'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../miniComponents/Button.js'
import Container from '../miniComponents/GenUseContainer.js'
import MiniLabel from '../miniComponents/MiniLabel.js'

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
const LabeledInput = styled.span`
  display: flex;
  height: fit-content;
  flex-direction: column;
`
const OnePlayer = ( props ) => <>
  <LabeledInput>
    <MiniLabel>{props.label}</MiniLabel>
    <div>
      <NumberInput type="number" value={props.money} onChange={ event => props.setMoney(event.target.value)} min={0} />
    </div>
  </LabeledInput>
</> 


const Money = ( props ) => {

  return (
    <Container>
      <OnePlayer label={'A before'} money={props.moneyBeforeA} setMoney={props.setMoneyBeforeA} />
      <OnePlayer label={'A now'} money={props.moneyTeamA} setMoney={props.setMoneyTeamA} />
      <Button style={{position: 'inline-block'}} onClick={() => fetch(`http://localhost:4545/money/${props.moneyBeforeA}/${props.moneyTeamA}`)}>GFX IN</Button>
      <OnePlayer label={'B before'} money={props.moneyBeforeB} setMoney={props.setMoneyBeforeB} />
      <OnePlayer label={'B now'} money={props.moneyTeamB} setMoney={props.setMoneyTeamB} />
      <Button style={{position: 'inline-block'}} onClick={() => fetch(`http://localhost:4545/money/${props.moneyBeforeB}/${props.moneyTeamB}`)}>GFX IN</Button>
      <Button style={{position: 'inline-block'}} onClick={() => fetch(`http://localhost:4545/moneyStart`)}>GFX start</Button>
      <Button style={{position: 'inline-block'}} onClick={() => fetch(`http://localhost:4545/moneyStop`)}>GFX stop</Button>
    </Container>
  )
}

export default Money