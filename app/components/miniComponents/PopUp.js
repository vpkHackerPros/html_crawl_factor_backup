import React, {useState} from 'react'
import styled from 'styled-components'


const StyledPopUp = styled.div`
  box-sizing: border-box;
  height: 90vh;
  width: 50vw;
  position: fixed;
  top: 5vh;
  left: 25vw;
  background-color: white;
  border: 3px solid black;
  border-radius:  50px 18px 50px 50px;
  z-index: 100;
  box-shadow: 0px 0px 1000px 200px white;
  display: grid;
  padding: 50px;
  padding-right: 3px;
  overflow-y: hidden;
  overflow-x: hidden;
`
const Content = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: inset 0px 0px  50px 50px white;
  ::-webkit-scrollbar {
      width: 30px;
  }
  ::-webkit-scrollbar-track {
      border-radius: 15px;
      background: black;
  }
  ::-webkit-scrollbar-thumb {
      border-radius: 15px;
      background: white;
      border: 3px solid black;
  }

`
const CloseButton = styled.button`
border: none;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: 3px;
  right: 3px;
  height: 30px;
  width: 30px;
  background-color: black;
  :focus {
    outline: none;
  }
  :active {
    color: var(--background);
    background: white;
  }
`
const Button = styled.button`
  display: inline-block; 
  background: none;
  border: 2px solid var(--shadow);
  border-radius: 5px;
  width: 120px;
  font-weight: bold;
  margin: 3px;
  color: var(--text);
  :focus {
    outline: none;
  }
`

const Panel = (props) => {
  return (
    <StyledPopUp>
      <CloseButton onClick = { () => props.setActive(false) }>X</CloseButton>
      { props.children }
    </StyledPopUp>
  )
}

export default function PopUp (props) {
  const [active, setActive] = useState(false)
  return (
    <>
      <Button onClick={ () => setActive(!active) }>POKAŽI VPRAŠANJA</Button>
      <Button onClick={ props.updateQuestions }>OSVEŽI VPRAŠANJA</Button>

      {
        active ? <Panel setActive={setActive}><Content>{props.children}</Content></Panel> : ''
      }
    </>
  )
}

