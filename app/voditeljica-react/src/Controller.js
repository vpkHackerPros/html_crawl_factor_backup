import './App.css'
import React, { useState, useEffect } from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import QuestionBox from './QuestionBox.js'
import SelectButton from './SelectButton.js'

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    width: 100vw;
    margin: 0;
    padding: 0;
    background: #333333;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`
const AppContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;

`
const MainContainer = styled.div`
  background: none;
  box-sizing: border-box;
  height: 90vh;
  width: 115vh;
  margin: 1vh;
  border: none;
  display: grid;
  grid-template-columns: auto auto auto auto;
  padding: 2vh;
`
const Controls = styled.div`
  background: none;
  box-sizing: border-box;
  height: 90vh;
  width: 25vh;
  margin: 1vh;
  border: none;
  padding: 2vh;
`
const Button = styled.button`
  margin: 3px;
  background: ${props => props.color};
  border: none;
  box-sizing:border-box;
  padding: 3px;
  font-size: 18px;
  font-weight: bold;
  padding: 8px;
  display: inline-block;
  width: 200px;
  height: 10%;
`
const ControlsLabel = styled.p`
  color: red;
  font-size: 14px;
  text-decoration: underline;
`

function App() {
  const [questionLevel, setQuestionLevel] = useState(0)
  const [changeIter, setChangeIter] = useState(0)
  const [isInSync, setIsInSync] = useState(false)
  const [randomPosition, setRandomPosition] = useState([0,1,2,3,4,5,6,7,8,9,10,11])
  const [isClosed, setIsClosed] = useState([
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
  ])
  const [danesJutriUsed, setDanesJutriUsed] = useState(false)
  const [category, setCategory] = useState([
    'šport', 'šport', 'šport', 
    'zemljepis', 'zemljepis', 'zemljepis', 
    'zgodovina', 'zgodovina', 'zgodovina', 
    'kultura', 'kultura', 'kultura', 
    'danes jutri', 'danes jutri', 'danes jutri'
  ])
  const [firstQuestions, setFirstQuestions] = useState([
    '1. predvprasanje', '2. predvprasanje', '3. predvprasanje',
    '4. predvprasanje', '5. predvprasanje', '6. predvprasanje',
    '7. predvprasanje', '8. predvprasanje', '9. predvprasanje',
    '10. predvprasanje', '11. predvprasanje', '12. predvprasanje',
    '13. predvprasanje', '14. predvprasanje', '15. predvprasanje'
  ])
  const [secondQuestions, setSecondQuestions] = useState([
    '1. glavno vprasanje', '2. glavno vprasanje', '3. glavno vprasanje',
    '4. glavno vprasanje', '5. glavno vprasanje', '6. glavno vprasanje',
    '7. glavno vprasanje', '8. glavno vprasanje', '9. glavno vprasanje',
    '10. glavno vprasanje', '11. glavno vprasanje', '12. glavno vprasanje',
    '13. glavno vprasanje', '14. glavno vprasanje', '15. glavno vprasanje'
  ])
  const [isSelected, setIsSelected] = useState([
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false 
  ])

  const substituteQuestions = (categoryNumber) => {
    const offset = categoryNumber * 3
    setRandomPosition (
      randomPosition.map((item, iter) => {
        if      (item == 0 + offset) return 12
        else if (item == 1 + offset) return 13
        else if (item == 2 + offset) return 14
        else return (item)
      })
    )
    setChangeIter(changeIter + 1)
  }
  const checkIfCategoryClosed = (categoryNumber) => {
    if (isClosed[0 + categoryNumber * 3] && isClosed[1 + categoryNumber * 3] && isClosed[2 + categoryNumber * 3]) {
      console.log(`category ${categoryNumber} is now closed`)
      return true
    } else {
      return false
    }
  }
  const danesJutri = () => {
    console.log('danes Jutri')
    if (danesJutriUsed != true) {
      console.log('ajajajaj')
      if ( checkIfCategoryClosed(0)) {
        setDanesJutriUsed(true)
        substituteQuestions(0)
      } else if ( checkIfCategoryClosed(1) ) {
        setDanesJutriUsed(true)
        substituteQuestions(1)
      } else if ( checkIfCategoryClosed(2) ) {
        setDanesJutriUsed(true)
        substituteQuestions(2)
      } else if ( checkIfCategoryClosed(3) ) {
        setDanesJutriUsed(true)
        substituteQuestions(3)
      }
    }
  }
  const randomize = () => {
    console.log('neki se zgodi')
      let inputArray = randomPosition
      let outputArray = inputArray.sort(() => Math.random() - 0.5)
      console.log(outputArray)
      setRandomPosition(outputArray)
      setChangeIter(changeIter + 1)
  }

  const whichSelected = () => {
    let position = 0
    isSelected.map((item, iter) => {
      if (item === true) position = iter
    })
    return position
  }
  useEffect(() => {
    if (isInSync) {
      fetch(`${window.location.origin.toString()}/positions`, {
        method: 'POST',
        body: JSON.stringify({
          positions: randomPosition
        }),
        headers: {'Content-Type': 'application/json'},
      })
    }
  }, [changeIter])  
  useEffect(() => {
    fetch(`${window.location.origin.toString()}/setGreys`, {
      method: 'POST',
      body: JSON.stringify({
        isClosed: isClosed
      }),
      headers: {'Content-Type': 'application/json'},
    })
    console.log('setting grays')
    danesJutri()
  }, [isClosed])
  useEffect(() => {
    if (danesJutriUsed == true) {
      fetch(`${window.location.origin.toString()}/setDanesJutriColors`)
    }
  }, [danesJutriUsed])
  useEffect(() => {
    fetch(`${window.location.origin.toString()}/order`)
    .then( res => res.json())
    .then( data => setRandomPosition(data.positions))
    .then( setIsInSync(true))
    fetch(`${window.location.origin.toString()}/grays`)
    .then( res => res.json())
    .then( data => {
      setIsClosed(data.isClosed)
      setChangeIter(changeIter + 1)
    })
  },[])

  return (
    <AppContainer>
      <GlobalStyle/>
      <MainContainer>
        {randomPosition.map((position, iter) => <QuestionBox 
        key={`${position}${iter}`} 
        isSelected={isSelected[position]}
        isClosed={isClosed[position]}
        setIsSelected={() => {setIsSelected(isSelected.map((item, iter) => {
          if (iter === position) return true
          else return false
        }))}}
        contents={{
          category: category[position], 
          content: secondQuestions[position], 
        }} 
        setContent={ text => setSecondQuestions( secondQuestions.map((item, iter) => {
          if (iter === position) return text
          else return item
        }))}
        />)}
      </MainContainer>
      <Controls>
        <Button color={'#78E0DC'} onClick={() => {
          switch (questionLevel) {
            case 0: 
              fetch(`${window.location.origin.toString()}/playFirst/${whichSelected()}`)
              setTimeout(() => {fetch(`${window.location.origin.toString()}/startClock`)}, 1000)
              setQuestionLevel(1)
              break
            case 1: 
              fetch(`${window.location.origin.toString()}/playSecond/${whichSelected()}`)
              setTimeout(() => {fetch(`${window.location.origin.toString()}/startClock`)}, 1000)
              setQuestionLevel(2)
              break
            case 2: 
              fetch(`${window.location.origin.toString()}/playMain`)
              setTimeout(() => {fetch(`${window.location.origin.toString()}/startClock`)}, 1000)
              setQuestionLevel(0)
              break
          }
        }}>{`${questionLevel + 1}. vprasanje`}</Button>
        <Button color={'#F4998D'} onClick={() => {        
          switch (questionLevel) {
            case 1:
              fetch(`${window.location.origin.toString()}/failed`)
              break
            case 2: 
            case 0:
              setIsClosed(isClosed.map((item, iter) => {
                if (isSelected[iter]) return true
                else return item
              }))
              fetch(`${window.location.origin.toString()}/failed`)
              break
          }
          setQuestionLevel(0)
        }}>Narobe</Button>


        <br></br>
        <br></br>
        <Button color={'lightblue'} onClick={() => fetch(`${window.location.origin.toString()}/soundFX`)}>ZVOČNI EFEKT</Button>
      </Controls>
    </AppContainer>
  )
}

export default App
