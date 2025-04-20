import { defineMessages } from "react-intl";

export const sectionMessages = defineMessages({
  open: {
    id: "section.open",
    defaultMessage: "Open",
    description: "Text for opening the section",
  },
  close: {
    id: "section.close",
    defaultMessage: "Close",
    description: "Text for closing the section",
  },
  displaySettings: {
    id: "section.displaySettings",
    defaultMessage: "Display Settings",
    description: "Display settings section title",
  },
  fontSettings: {
    id: "section.fontSettings",
    defaultMessage: "Font Settings",
    description: "Font settings section title",
  }
});

export const pluginMessages = defineMessages({
  poweredBy: {
    id: "plugins.poweredBy",
    defaultMessage: "Powered by",
    description: "Attribution text for external services",
  },
});
