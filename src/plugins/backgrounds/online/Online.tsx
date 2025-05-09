import React from "react";
import Backdrop from "../../../views/shared/Backdrop";
import "./Online.sass";
import { defaultData, Props } from "./types";

const Online: React.FC<Props> = ({ data = defaultData }) => {
  if (!data.url) return <div className="Online default fullscreen" />;

  return (
    <Backdrop
      className="Online fullscreen"
      url={data.url}
    />
  );
};

export default Online;
