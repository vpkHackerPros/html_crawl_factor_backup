import React, {useState} from 'react'
import styled from 'styled-components'

const ButtonRight = styled.button`
  background: none;
  height: 0px;
  width: 0px;
  border-bottom: 20vh solid white;
  border-left: 20vh solid rgba(0,0,0,0.0);
  border-right: 0vh solid rgba(0,0,0,0.0);
  border-top: 0px solid rgba(0,0,0,0.0);
  margin: auto;
`
const ButtonLeft = styled.button`
  background: none;
  height: 0px;
  width: 0px;
  border-bottom: 20vh solid var(--text);
  border-left: 0vh solid rgba(0,0,0,0.0);
  border-right: 20vh solid rgba(0,0,0,0.0);
  border-top: 0px solid rgba(0,0,0,0.0);
  margin: auto;
`
const Prize = styled.button`
  transform: rotate(90deg);
  background: white;
  border: 3px solid var(--text);
  height: 50px;
  width: 100px;
  display: inline-block;
  margin: 2px;
`

const PrizeBox = styled.div`
  width: 90vh;
  height: 20vh;
  display: flex;
  flex-direction: row;
`

const BallPosition = styled.button`
  border-radius: 50%;
  border: none;
  background-color: white;
  box-shadow: 0px 0px 20px var(--shadow);
  margin: 10px;
  height: 100px;
  width: 100px;
`

export default function PramidaControls (props) {
  const [prizes, setPrizes] = useState([10, 200, 1000, 50, 10000, 20, 3000, 500])
  return (
    <div>
      <ButtonRight />
      <ButtonLeft />
      <BallPosition>1</BallPosition>
      <BallPosition>2</BallPosition>
      <BallPosition>3</BallPosition>
      <BallPosition>4</BallPosition>
      <BallPosition>5</BallPosition>
      <BallPosition>6</BallPosition>
      <PrizeBox>
      {
        prizes.map( prize => <Prize onClick={() => props.setMoneyInGame(prize)}>{prize}</Prize>)
      }
      </PrizeBox>
    </div>
  )
}