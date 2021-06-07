import React from 'react'
import styled from 'styled-components'
import Container from '../miniComponents/GenUseContainer.js'
import Button from '../miniComponents/Button.js'

const ThinkTimePanel = ( props ) => {
  return (
    <Container>
      <Button onClick={() => fetch(`http://localhost:4545/timer30`)} >URA ŠTART 30s</Button>
      <Button onClick={() => fetch(`http://localhost:4545/backgroundNeutral`)} >URA OUT</Button>
    </Container>
  )
}


export default ThinkTimePanel