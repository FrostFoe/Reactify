"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PuppeteerExtraPluginAdblocker = void 0;
const fs_1 = require("fs");
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const adblocker_puppeteer_1 = require("@cliqz/adblocker-puppeteer");
const node_fetch_1 = __importDefault(require("node-fetch"));
const puppeteer_extra_plugin_1 = require("puppeteer-extra-plugin");
const pkg = require('../package.json');
const engineCacheFilename = `${pkg.name}-${pkg.version}-engine.bin`;
/**
 * A puppeteer-extra plugin to automatically block ads and trackers.
 */
class PuppeteerExtraPluginAdblocker extends puppeteer_extra_plugin_1.PuppeteerExtraPlugin {
    constructor(opts) {
        super(opts);
        this.debug('Initialized', this.opts);
    }
    get name() {
        return 'adblocker';
    }
    get defaults() {
        return {
            blockTrackers: false,
            blockTrackersAndAnnoyances: false,
            useCache: true,
            cacheDir: undefined,
            interceptResolutionPriority: undefined
        };
    }
    get engineCacheFile() {
        const cacheDir = this.opts.cacheDir || os_1.default.tmpdir();
        return path_1.default.join(cacheDir, engineCacheFilename);
    }
    /**
     * Cache an instance of `PuppeteerBlocker` to disk if 'cacheDir' option was
     * specified for the plugin. It can then be used the next time this plugin is
     * used to load the adblocker faster.
     */
    async persistToCache(blocker) {
        if (!this.opts.useCache) {
            return;
        }
        this.debug('persist to cache', this.engineCacheFile);
        await fs_1.promises.writeFile(this.engineCacheFile, blocker.serialize());
    }
    /**
     * Initialize instance of `PuppeteerBlocker` from cache if possible.
     * Otherwise, it throws and we will try to initialize it from remote instead.
     */
    async loadFromCache() {
        if (!this.opts.useCache) {
            throw new Error('caching disabled');
        }
        this.debug('load from cache', this.engineCacheFile);
        return adblocker_puppeteer_1.PuppeteerBlocker.deserialize(new Uint8Array(await fs_1.promises.readFile(this.engineCacheFile)));
    }
    /**
     * Initialize instance of `PuppeteerBlocker` from remote (either by fetching
     * a serialized version of the engine when available, or by downloading raw
     * lists for filters such as EasyList then parsing them to initialize
     * blocker).
     */
    async loadFromRemote() {
        this.debug('load from remote', {
            blockTrackers: this.opts.blockTrackers,
            blockTrackersAndAnnoyances: this.opts.blockTrackersAndAnnoyances
        });
        if (this.opts.blockTrackersAndAnnoyances === true) {
            return adblocker_puppeteer_1.PuppeteerBlocker.fromPrebuiltFull(node_fetch_1.default);
        }
        else if (this.opts.blockTrackers === true) {
            return adblocker_puppeteer_1.PuppeteerBlocker.fromPrebuiltAdsAndTracking(node_fetch_1.default);
        }
        else {
            return adblocker_puppeteer_1.PuppeteerBlocker.fromPrebuiltAdsOnly(node_fetch_1.default);
        }
    }
    /**
     * Return instance of `PuppeteerBlocker`. It will take care of initializing
     * it if necessary (first time it is called), or return the existing instance
     * if it already exists.
     */
    async getBlocker() {
        this.debug('getBlocker', { hasBlocker: !!this.blocker });
        if (this.blocker === undefined) {
            try {
                this.blocker = await this.loadFromCache();
                this.setRequestInterceptionPriority();
            }
            catch (ex) {
                this.blocker = await this.loadFromRemote();
                this.setRequestInterceptionPriority();
                await this.persistToCache(this.blocker);
            }
        }
        return this.blocker;
    }
    /**
     * Sets the request interception priority on the `PuppeteerBlocker` instance.
     */
    setRequestInterceptionPriority() {
        var _a;
        (_a = this.blocker) === null || _a === void 0 ? void 0 : _a.setRequestInterceptionPriority(this.opts.interceptResolutionPriority);
    }
    /**
     * Hook into this blocking event to make sure the cache is initialized before navigation.
     */
    async beforeLaunch() {
        this.debug('beforeLaunch');
        await this.getBlocker();
    }
    /**
     * Hook into this blocking event to make sure the cache is initialized before navigation.
     */
    async beforeConnect() {
        this.debug('beforeConnect');
        await this.getBlocker();
    }
    /**
     * Enable adblocking in `page`.
     */
    async onPageCreated(page) {
        this.debug('onPageCreated');
        (await this.getBlocker()).enableBlockingInPage(page);
    }
}
exports.PuppeteerExtraPluginAdblocker = PuppeteerExtraPluginAdblocker;
exports.default = (options = {}) => {
    return new PuppeteerExtraPluginAdblocker(options);
};
//# sourceMappingURL=index.js.map