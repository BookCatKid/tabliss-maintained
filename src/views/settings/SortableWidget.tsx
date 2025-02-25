import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { WidgetState } from "../../db/state";
import Widget from "./Widget";

interface Props {
  id: string;
  widget: WidgetState;
  index: number;
  total: number;
  onRemove: () => void;
}

const DragHandle: React.FC = () => (
  <span className="drag-handle" style={{ cursor: 'grab', marginRight: '8px', display: 'inline-block' }}>⋮⋮</span>
);

export const SortableWidget: React.FC<Props> = ({ widget, index, total, onRemove, id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    position: 'relative' as const,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Widget
        plugin={widget}
        onMoveUp={undefined}
        onMoveDown={undefined}
        onRemove={onRemove}
        dragHandle={
          <div {...attributes} {...listeners} style={{ display: 'inline-block', touchAction: 'none' }}>
            <DragHandle />
          </div>
        }
      />
    </div>
  );
};
