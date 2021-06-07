import React from 'react'
import styled from 'styled-components'
import Container from '../miniComponents/GenUseContainer.js'
import Button from '../miniComponents/Button.js'

const SumShow = ( props ) => {
  return (
    <Container>
      <p>DENAR GFX</p>
      <Button onClick={() => fetch(`http://localhost:4545/money/${props.before}/${props.after}`)}>GFX IN</Button>
      <Button onClick={() => fetch(`http://localhost:4545/moneyStart`)}>GFX start</Button>
      <Button onClick={() => fetch(`http://localhost:4545/moneyStop`)}>GFX stop</Button>
      <Button onClick={() => fetch(`http://localhost:4545/moneyOnAir/${props.after}`)}>GFX onAir IN</Button>
      <Button onClick={() => fetch(`http://localhost:4545/moneyOnAirOut`)}>GFX onAir OUT</Button>
    </Container>
  )
}


export default SumShow
