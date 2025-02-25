import React from "react";
import { FormattedMessage } from "react-intl";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { addWidget, removeWidget, reorderWidget } from "../../db/action";
import { selectWidgets } from "../../db/select";
import { db } from "../../db/state";
import { useSelector } from "../../lib/db/react";
import { widgetConfigs } from "../../plugins";
import { SortableWidget } from "./SortableWidget";
import type { WidgetState } from "../../db/state";

const Widgets: React.FC = () => {
  const widgets = useSelector(db, selectWidgets);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = widgets.findIndex((item) => item.id === active.id);
      const newIndex = widgets.findIndex((item) => item.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderWidget(oldIndex, newIndex);
      }
    }
  };

  return (
    <div>
      <h2>
        <FormattedMessage
          id="widgets"
          defaultMessage="Widgets"
          description="Widgets title"
        />
      </h2>

      <label>
        <select
          value=""
          onChange={(event) => addWidget(event.target.value)}
          className="primary"
        >
          <option disabled value="">
            Add a new widget
          </option>
          {widgetConfigs.map((plugin) => (
            <option key={plugin.key} value={plugin.key}>
              {plugin.name}
            </option>
          ))}
        </select>
      </label>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={widgets.map((w) => w.id)}
          strategy={verticalListSortingStrategy}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {widgets.map((widget: WidgetState, index: number) => (
              <SortableWidget
                key={widget.id}
                id={widget.id}
                widget={widget}
                index={index}
                total={widgets.length}
                onRemove={() => removeWidget(widget.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Widgets;
