 import React from 'react'
 import Draggable from 'react-draggable'


 export default function DraggableTest(props) {
   return (
      <Draggable
        axis="x"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[1, 2]}
        scale={1}
      >
        <div>
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable>
   )
 }