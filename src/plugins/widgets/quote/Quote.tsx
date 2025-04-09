import React from "react";
import { useCachedEffect } from "../../../hooks";
import { HOURS } from "../../../utils";
import { getQuote } from "./api";
import "./Quote.sass";
import { defaultData, Props } from "./types";
import { bibleVerses } from "./bibleVerses";

const EXPIRE_IN = 1 * HOURS;

function getRandomBibleVerse() {
  const index = Math.floor(Math.random() * bibleVerses.length);
  return bibleVerses[index];
}

const Quote: React.FC<Props> = ({ cache, data = defaultData, setCache, loader }) => {
  useCachedEffect(
    () => {
      if (data.category === "bible") {
        const verse = getRandomBibleVerse();
        setCache({ quote: verse.quote, author: verse.author, timestamp: Date.now() });
      } else {
        getQuote(loader, data.category ?? "quotable").then(setCache);
      }
    },
    cache ? cache.timestamp + EXPIRE_IN : 0,
    [data.category],
  );

  if (!cache) return null;

  return (
    <div className="Quote">
      <h4 className="QuoteContent">
        “{cache.quote}”
        {cache.author && (
          <sub>
            <br />
            &mdash; {cache.author}
          </sub>
        )}
      </h4>
    </div>
  );
};

export default Quote;
