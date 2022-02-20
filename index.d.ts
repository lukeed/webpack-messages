export = WebpackMessages;
/** @typedef {{name?: string; onComplete?: (...args: unknown[]) => void; logger?: (msg: string) => void; }} Options*/
/** @typedef {import('webpack').WebpackPluginInstance} WebpackPluginInstance */
/** @implements {WebpackPluginInstance} */
declare class WebpackMessages implements WebpackPluginInstance {
    /** @param {Options} [opts] */
    constructor(opts?: Options);
    name: string;
    onDone: (...args: unknown[]) => void;
    logger: (str: string) => void;
    /** @type {(str: string, arr?: string[]) => void} */
    printError(str: string, arr: string[]): void;
    /** @param {import('webpack').Compiler} compiler */
    apply(compiler: import('webpack').Compiler): void;
}
declare namespace WebpackMessages {
    export { Options, WebpackPluginInstance };
}
type WebpackPluginInstance = import('webpack').WebpackPluginInstance;
type Options = {
    name?: string;
    onComplete?: (...args: unknown[]) => void;
    logger?: (msg: string) => void;
};
