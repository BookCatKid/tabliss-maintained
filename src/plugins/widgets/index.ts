import countdown from "./countdown";
import since from "./since";
import bitcoin from "./bitcoin";
import css from "./css";
import github from "./github";
import greeting from "./greeting";
import html from "./html";
import ipInfo from "./ipInfo";
import js from "./js";
import links from "./links";
import literatureClock from "./literatureClock";
import message from "./message";
// import nba from "./nba";  TODO: FIX (IT'S BROKEN)
import notes from "./notes";
// import randomMessage from "./randomMessage"; removed, use customText
import nba from "./nba";
import quote from "./quote";
import search from "./search";
import time from "./time";
import todo from "./todo";
import weather from "./weather";
import workHours from "./workHours";
import joke from "./joke";
import CustomText from "./customText";
import bookmarks from "./bookmarks";
import binarytime from "./binaryTime";
import stocks from "./stocks";

export const widgetConfigs = [
  countdown,
  binarytime,
  bookmarks,
  since,
  bitcoin,
  css,
  github,
  greeting,
  html,
  ipInfo,
  links,
  literatureClock,
  message,
  // nba,
  notes,
  nba,
  quote,
  search,
  stocks,
  time,
  todo,
  weather,
  workHours,
  joke,
  CustomText,
];

if (BUILD_TARGET === "web") {
  widgetConfigs.push(js);
}

widgetConfigs.sort((a, b) => a.name.localeCompare(b.name));
