import React from 'react'
import styled from 'styled-components'
import ButtonRow from '../miniComponents/ButtonRow'

const DeleteQuestion = ( props ) => <ButtonRow 
  labels={'izbrisi A', 'izbrisi B', 'izbrisi C', 'izbrisi D' } 
  onClicks={[
    () => fetch('http://localhost:4545/deleteOneAnswer/1'),
    () => fetch('http://localhost:4545/deleteOneAnswer/2'),
    () => fetch('http://localhost:4545/deleteOneAnswer/3'),
    () => fetch('http://localhost:4545/deleteOneAnswer/4'),
  ]}  
/>