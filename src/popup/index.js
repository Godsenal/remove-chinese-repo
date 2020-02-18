// send result of toggle to content script.
function handleChange(pathname, element) {
  const {
    target: { checked }
  } = element;
  chrome.storage.sync.set({ [pathname]: checked }, function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { show: checked });
    });
  });
}
(function() {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
    const url = tabs[0].url;
    const { pathname } = new URL(url);
    const currentPath = document.getElementById("currentPath");
    const description = document.getElementById("description");
    currentPath.innerText = pathname;
    description.innerText = "Remove all chinese repo.";
    chrome.storage.sync.get([pathname], result => {
      // if storage value is not set, default value is true.
      const initialChecked = pathname in result ? result[pathname] : true;
      const toggle = document.getElementById("toggle");
      toggle.checked = initialChecked;
      toggle.onchange = handleChange.bind(null, pathname);
    });
    chrome.runtime.onMessage.addListener(function(request) {
      if (request.message === "update_count") {
        document.getElementById("count").innerText = request.count;
      }
    });

    // 초기 카운트 요청
    chrome.tabs.sendMessage(tabs[0].id, { message: "request_count" });
  });
})();
