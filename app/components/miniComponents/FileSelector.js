import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCsv } from '@fortawesome/free-solid-svg-icons'


const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  top:0;
  left: 0px;
  z-index: -1;
`
const Label = styled.label`
  border: none;
  border-bottom: 1px solid var(--text);
  margin: 10px;
  width: 200px;
  max-width: 200px;
`



function FileSelector (props) {
  return (
    <div>
      <Input 
        type={'file'}
        id={props.id}
        onInput={(event) => {
          console.log(event.target.files)
          props.setPath(event.target.files[0].path)
          props.onInput()
        }}
        
      />
      <Label 
        htmlFor={props.id}
      >{'vprašanja:  ' + '... ' + props.path.slice(-20) + ' '}
        <span style={{fontSize: '30px'}}>
          <FontAwesomeIcon icon={faFileCsv} swapOpacity/>
        </span>
      </Label>
    </div>
  )
}



export default FileSelector
