const queryForPath = {
  "/explore": "article.Story",
  "/discover": "[class*=repository-recommendation-and-restore]",
  "/trending": "ol.repo-list li"
};
const discoverWrapper = "[class*=discover-repositories]";

const defaultTitle = "h1, h2, h3";
const defaultDescription = "[itemprop=description], p, .text-gray";
const currentPath = window.location.pathname;
const runtime = chrome.runtime;

const removed = new Set(); // save removed chinese repo for recover
