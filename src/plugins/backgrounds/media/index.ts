import { Config } from "../../types";
import Media from "./Media";
import ImageSettings from "./MediaSettings";

const config: Config = {
  key: "background/image", // not changing to /media for backwards compatibility.
  name: "Upload Images & Videos",
  description: "See your own media.",
  dashboardComponent: Media,
  settingsComponent: ImageSettings,
  supportsBackdrop: true,
};

export default config;
