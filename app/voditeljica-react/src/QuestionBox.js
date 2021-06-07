import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  box-sizing: border-box;
  border: ${ props => props.isSelected? '7px solid white': 'none' };
  font-size: 38px;
  font-weight: bold;
  color: #555555;
  margin: ${props => props.isSelected? '1px' : '8px'};
  position: relative;
  overflow: hidden;
  &::after {
  position: absolute;
    content: '';
    background: #333333;
    display: block;
    width: 100%;
    height: ${props => props.isClosed? '9px' : '0px'};
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    right: 0;
    bottom: 50%;
  }
  &::before {
  position: absolute;
    content: '';
    background: #333333;
    display: block;
    width: 100%;
    height: ${props => props.isClosed? '9px' : '0px'};
    -webkit-transform: rotate(-45deg);
    transform: rotate(45deg);
    right: 0;
    bottom: 50%;
  }
`
const Category = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 22px;
  color: #333333;
  font-weight: bold;
  padding: 2px;
  text-align: center;
  background: ${props => props.color };
`
const Content = styled.div`
  padding: 5px;
`

function QuestionBox (props) {
  const selectColor = () => {
    let color
    switch (props.contents.category) {
      case 'zemljepis':
        color = '#75F4F4'
        break
      case 'šport':
        color = '#90E0F3'
        break
      case 'zgodovina':
        color = '#B8B3E9'
        break
      case 'kultura':
        color = '#D999B9'
        break
      default: 
        color = 'darkgrey'
    }
    return color
  }
  return (
    <Box isSelected={props.isSelected} isClosed={props.isClosed}>
      <Category category={props.contents.category}
        onClick={props.setIsSelected}
        color={selectColor}
      >{props.contents.category}</Category>
    </Box>
  )
}

export default QuestionBox
