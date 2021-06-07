import React from 'react'
import styled from 'styled-components'
import ButtonRow from '../miniComponents/ButtonRow.js'


const HoleSelector = ( props ) => {
  const labels=[0,1,2,3,4,5,6]
  return (
    <ButtonRow labels={labels} onClicks={labels.map( label => () => fetch(`http://localhost:4545/ballAnimationRed/${label}`))} />
  )
}

export default HoleSelector