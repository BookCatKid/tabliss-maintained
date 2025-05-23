import { API } from "../../types";

type Data = {
  searchEngine: string;
  searchEngineCustom?: string;
  suggestionsEngine?: string;
  suggestionsQuantity: number;
  placeholderText?: string;
};

export type Props = API<Data>;

export const defaultData: Data = {
  searchEngine: "default",
  suggestionsQuantity: 4,
};

export const SEARCH_ENGINE_CUSTOM = "CUSTOM";
