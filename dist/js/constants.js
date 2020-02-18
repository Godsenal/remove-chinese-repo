const queryForPath = {
  "/explore": "article",
  "/discover": "[class*=repository-recommendation-and-restore]",
  "/trending": "article.Box-row"
};
const discoverWrapper = "[class*=discover-repositories]";

const currentPath = window.location.pathname;
const runtime = chrome.runtime;

const defaultTitle = "h1, h2, h3";
const defaultDescription =
  currentPath === "/discover" ? "[itemprop=description]" : "p";

const removed = new Set(); // save removed chinese repo for recover
