import tlds from "tlds";
import { engines } from "./engines";
import { SEARCH_ENGINE_CUSTOM } from "./types";

// TODO: Add unit tests
export function buildUrl(query: string, engineUrl: string) {
  // See if they have started with a web scheme
  if (/^https?:\/\/\w+/.test(query)) {
    return query;
  }

  // See if they have ended with a valid TLD
  if (tlds.some((tld) => query.endsWith(`.${tld}`)) && !query.includes(" ")) {
    return `https://${query}`;
  }

  // Probably searching then
  return engineUrl.replace("{searchTerms}", encodeURIComponent(query));
}

export function getSearchUrl(key: string, custom?: string) {
  const engine =
    key === SEARCH_ENGINE_CUSTOM
      ? custom
      : engines.find((engine) => engine.key === key)?.search_url;

  return engine || engines[0].search_url;
}

export function getSuggestUrl(key?: string) {
  const engine = engines.find((engine) => engine.key === key);

  return engine ? engine.suggest_url : undefined;
}
