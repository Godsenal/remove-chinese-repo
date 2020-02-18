export const queryForPath = {
  "/explore": "article",
  // "/discover": "[class*=repository-recommendation-and-restore]",
  "/trending": "article.Box-row"
};
export const discoverWrapper = "[class*=discover-repositories]";

export const currentPath = window.location.pathname;
export const runtime = chrome.runtime;

export const defaultTitle = "h1, h2, h3";
export const defaultDescription = "p";
