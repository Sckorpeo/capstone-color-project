import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer(({ colorArray, removeColor }) => {
    return (
        <div style={{ height: '100%' }}>
            {colorArray.map((color, i) => (
                <DraggableColorBox
                    index={i}
                    color={color.color}
                    name={color.name}
                    handleDelete={() => removeColor(color.name)}
                    key={color.name}
                />
            ))}
        </div>
    )
})

export default DraggableColorList;