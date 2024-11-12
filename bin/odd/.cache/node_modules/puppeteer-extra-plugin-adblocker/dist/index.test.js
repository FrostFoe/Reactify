"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const index_1 = __importDefault(require("./index"));
const PUPPETEER_ARGS = ['--no-sandbox', '--disable-setuid-sandbox'];
(0, ava_1.default)('will block ads', async (t) => {
    const puppeteer = require('puppeteer-extra');
    const adblockerPlugin = (0, index_1.default)({
        blockTrackers: true
    });
    puppeteer.use(adblockerPlugin);
    const browser = await puppeteer.launch({
        args: PUPPETEER_ARGS,
        headless: true
    });
    const blocker = await adblockerPlugin.getBlocker();
    const page = await browser.newPage();
    let blockedRequests = 0;
    blocker.on('request-blocked', () => {
        blockedRequests += 1;
    });
    let hiddenAds = 0;
    blocker.on('style-injected', () => {
        hiddenAds += 1;
    });
    const url = 'https://www.google.com/search?q=rent%20a%20car';
    await page.goto(url, { waitUntil: 'networkidle0' });
    t.not(hiddenAds, 0);
    t.not(blockedRequests, 0);
    await browser.close();
});
//# sourceMappingURL=index.test.js.map