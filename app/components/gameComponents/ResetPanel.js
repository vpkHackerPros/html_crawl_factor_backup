import React from 'react'
import ButtonRow from '../minicomponents/ButtonRow.js'

const ResetPanel = (props) => <ButtonRow 
  labels={['resetiraj ozadje in kontejnerje', 'vprašanje OUT']}
  onClicks={[
    () => {
      fetch('http://localhost:4545/backgroundNeutral')
      fetch('http://localhost:4545/ballDropClear')
    },
    () => fetch('http://localhost:4545/ballDropVizOut')
  ]}
/>
export default ResetPanel