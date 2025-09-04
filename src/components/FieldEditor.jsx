import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

// FieldEditor allows adding/reordering fields (limits enforced at parent level)
export default function FieldEditor({ fields = [], onChange }) {
  const [local, setLocal] = useState(fields)

  const onDragEnd = result => {
    if (!result.destination) return
    const items = Array.from(local)
    const [reordered] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reordered)
    setLocal(items)
    onChange(items)
  }

  return (
    <div>
      <div className="mb-2">Fields (drag to reorder)</div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {local.map((f, idx) => (
                <Draggable key={f.id||idx} index={idx} draggableId={f.id||String(idx)}>
                  {(prov) => (
                    <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} className="p-2 border rounded mb-2">
                      <div className="font-medium">{f.title || 'Untitled'}</div>
                      <div className="text-sm text-muted">{f.type}</div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
