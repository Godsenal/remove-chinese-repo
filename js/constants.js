const queryForPath = {
  "/explore": "article.Story",
  "/discover": "[class*=repository-recommendation-and-restore]",
  "/trending": "ol.repo-list li"
};
const lazyPath = ["/discover"];
const lazyTarget = "[class*=discover-repositories]";

const currentPath = window.location.pathname;
const runtime = chrome.runtime;

const isLazyPage = lazyPath.includes(currentPath);
