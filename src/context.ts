import { createContext } from "react";
import {TranslationProperties} from "./useTranslation.js";

export enum Language {
    English = "en",
    Russian = "ru",
    Chinese = "zh"
}

export type TemplateFunction = (args: TranslationProperties) => string;

export type Translation = {
    [key: string]: Translation | string | number | TemplateFunction;
};

export type TranslationMap = {
    [language in Language]?: Translation;
};

export type TranslationSettings = {
    translations: TranslationMap;
    language: Language;
    fallbackLanguage: Language;
};

export const TranslationContext = createContext<TranslationSettings>({
    fallbackLanguage: Language.English,
    language: Language.English,
    translations: {
        en: {},
    },
});
