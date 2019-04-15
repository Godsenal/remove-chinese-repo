// activate icon by page_action in content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "activate_icon") {
    chrome.pageAction.show(sender.tab.id);
  }
  if (request.message === "deactivate_icon") {
    chomre.pageAction.hide(sender.tab.id);
  }
});
