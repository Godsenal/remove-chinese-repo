export const updateCount = count => {
  chrome.runtime.sendMessage({ message: "update_count", count });
};

export const activateIcon = () => {
  chrome.runtime.sendMessage({ message: "activate_icon" });
  // set page action icon on when user visited matched URL in manifest
};

// get message from popup when user toggled switch
