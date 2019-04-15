chrome.runtime.sendMessage({ message: "activate_icon" });
// set page action icon on when user visited matched URL in manifest

chrome.runtime.onMessage.addListener((req, sender, res) => {
  req.show ? init() : recover();
});
// get message from popup when user toggled switch
