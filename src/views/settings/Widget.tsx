import React from "react";
import { setWidgetDisplay } from "../../db/action";
import { WidgetState } from "../../db/state";
import { useToggle } from "../../hooks";
import { getConfig } from "../../plugins";
import { Icon, IconButton, RemoveIcon } from "../shared";
import PluginContainer from "../shared/Plugin";
import ToggleSection from "../shared/ToggleSection";
import "./Widget.sass";
import WidgetDisplay from "./WidgetDisplay";

interface Props {
  plugin: WidgetState;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
  dragHandle?: React.ReactNode;
}

const Widget: React.FC<Props> = ({
  plugin,
  onMoveDown,
  onMoveUp,
  onRemove,
  dragHandle,
}) => {
  const [isOpen, toggleIsOpen] = useToggle(onRemove === undefined);
  const { description, name, settingsComponent } = getConfig(plugin.key);
  const setDisplay = setWidgetDisplay.bind(null, plugin.id);

  return (
    <fieldset className="Widget">
      <div className="title--buttons">
        <div className="title-section">
          {dragHandle}
          <h4 onClick={toggleIsOpen}>{name}</h4>
        </div>
        <div className="button-section">
          <IconButton
            onClick={toggleIsOpen}
            title={`${isOpen ? "Close" : "Edit"} widget settings`}
          >
            <Icon name="settings" />
          </IconButton>
          <IconButton onClick={onRemove} title="Remove widget">
            <RemoveIcon />
          </IconButton>
        </div>
      </div>
      {!isOpen && description && <p>{description}</p>}

      {isOpen && (
        <div>
          {settingsComponent && (
            <div className="settings">
              <PluginContainer id={plugin.id} component={settingsComponent} />
            </div>
          )}

          <ToggleSection name="Display Settings">
            <WidgetDisplay display={plugin.display} onChange={setDisplay} />
          </ToggleSection>

          <ToggleSection name="Font Settings">
            <>
              <label>
                Font
                <input
                  type="text"
                  value={plugin.display.fontFamily}
                  onChange={(event) =>
                    setDisplay({ fontFamily: event.target.value })
                  }
                />
              </label>

              <label>
                Weight
                <select
                  value={plugin.display.fontWeight}
                  onChange={(event) =>
                    setDisplay({
                      fontWeight: event.target.value
                        ? Number(event.target.value)
                        : undefined,
                    })
                  }
                >
                  <option value="">Default</option>
                  <option value="100">Thin</option>
                  <option value="300">Light</option>
                  <option value="400">Regular</option>
                  <option value="500">Medium</option>
                  <option value="700">Bold</option>
                  <option value="900">Black</option>
                </select>
              </label>

              <label>
                Colour
                <input
                  type="color"
                  value={plugin.display.colour ?? "#ffffff"}
                  onChange={(event) =>
                    setDisplay({ colour: event.target.value })
                  }
                />
              </label>
            </>
          </ToggleSection>
        </div>
      )}
    </fieldset>
  );
};

export default Widget;
