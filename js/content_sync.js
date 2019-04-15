// start script path setting in storage
chrome.storage.sync.get([currentPath], result => {
  const shouldInitialize = currentPath in result ? result[currentPath] : true;
  shouldInitialize && init();
});
