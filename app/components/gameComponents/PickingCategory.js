import React from 'react'
import styled from 'styled-components'
import Container from '../miniComponents/GenUseContainer.js'
import ButtonRow from '../miniComponents/ButtonRow.js'
import Button from '../miniComponents/Button.js'


const PickingCategory = ( props ) => {
  return (
    <Container>
      <Button onClick={() => fetch('http://localhost:4545/sendTopics') }>pošlji podatke</Button>
      <Button onClick={() => fetch('http://localhost:4545/showTopics') }>tema ena za drugo</Button>
      <ButtonRow labels={['tema 1', 'tema 2']} onClicks={[ () => fetch(`http://localhost:4545/chooseTopic/${props.team}/1`), 
        () => fetch(`http://localhost:4545/chooseTopic/${props.team}/2`)]} />
      <Button onClick={() => fetch('http://localhost:4545/gfxOut') }>GFX OUT</Button>
      <Button onClick={() => fetch('http://localhost:4545/backgroundNeutral') }>nevtral background</Button>
    </Container>
  )
}


export default PickingCategory