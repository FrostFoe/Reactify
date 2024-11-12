import { PuppeteerBlocker } from '@cliqz/adblocker-puppeteer';
import { PuppeteerExtraPlugin } from 'puppeteer-extra-plugin';
/** Available plugin options */
export interface PluginOptions {
    /** Whether or not to block trackers (in addition to ads). Default: false */
    blockTrackers: boolean;
    /** Whether or not to block trackers and other annoyances, including cookie
        notices. Default: false */
    blockTrackersAndAnnoyances: boolean;
    /** Persist adblocker engine cache to disk for speedup. Default: true */
    useCache: boolean;
    /** Optional custom directory for adblocker cache files. Default: undefined */
    cacheDir?: string;
    /** Optional custom priority for interception resolution. Default: undefined */
    interceptResolutionPriority?: number;
}
/**
 * A puppeteer-extra plugin to automatically block ads and trackers.
 */
export declare class PuppeteerExtraPluginAdblocker extends PuppeteerExtraPlugin {
    private blocker;
    constructor(opts: Partial<PluginOptions>);
    get name(): string;
    get defaults(): PluginOptions;
    get engineCacheFile(): string;
    /**
     * Cache an instance of `PuppeteerBlocker` to disk if 'cacheDir' option was
     * specified for the plugin. It can then be used the next time this plugin is
     * used to load the adblocker faster.
     */
    private persistToCache;
    /**
     * Initialize instance of `PuppeteerBlocker` from cache if possible.
     * Otherwise, it throws and we will try to initialize it from remote instead.
     */
    private loadFromCache;
    /**
     * Initialize instance of `PuppeteerBlocker` from remote (either by fetching
     * a serialized version of the engine when available, or by downloading raw
     * lists for filters such as EasyList then parsing them to initialize
     * blocker).
     */
    private loadFromRemote;
    /**
     * Return instance of `PuppeteerBlocker`. It will take care of initializing
     * it if necessary (first time it is called), or return the existing instance
     * if it already exists.
     */
    getBlocker(): Promise<PuppeteerBlocker>;
    /**
     * Sets the request interception priority on the `PuppeteerBlocker` instance.
     */
    private setRequestInterceptionPriority;
    /**
     * Hook into this blocking event to make sure the cache is initialized before navigation.
     */
    beforeLaunch(): Promise<void>;
    /**
     * Hook into this blocking event to make sure the cache is initialized before navigation.
     */
    beforeConnect(): Promise<void>;
    /**
     * Enable adblocking in `page`.
     */
    onPageCreated(page: any): Promise<void>;
}
declare const _default: (options?: Partial<PluginOptions>) => PuppeteerExtraPluginAdblocker;
export default _default;
