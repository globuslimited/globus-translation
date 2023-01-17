import { applyTemplate } from "shared/helper.js";

type Handler<Options> = (options: Options, language: string) => string;

export type Extension<Arguments, BasicOptions extends {}> = <TemplateOptions extends {}>(
    translation: Arguments,
) => {
    __isExtension: true;
    supportedLanguages?: string[];
    handler: Handler<BasicOptions & TemplateOptions>;
};

export const createExtension = <Arguments, BasicOptions extends {} = {}>(
    translate: <Options>(translation: Arguments, options: Options, language: string) => string,
    supportedLanguages?: string[],
): Extension<Arguments, BasicOptions> => {
    return <TemplateOptions extends {} = {}>(translation: Arguments) => {
        return {
            __isExtension: true,
            supportedLanguages,
            handler: (options: BasicOptions & TemplateOptions, language) => applyTemplate(translate(translation, options, language), options),
        };
    };
};