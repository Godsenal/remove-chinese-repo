import { updateCount } from "./message";
import { removeChineseFromList, recover } from "./util";
import { queryForPath, currentPath } from "./constants";
import removeData, { REMOVE_EVENT_TYPE } from "./data";

const dataUpdateHandler = data => updateCount(data.size);

export function init() {
  chrome.storage.sync.get([currentPath], result => {
    const shouldInitialize = currentPath in result ? result[currentPath] : true;
    shouldInitialize && start();
  });
  chrome.runtime.onMessage.addListener((req, sender, res) => {
    if (req.message === "request_count") {
      return dataUpdateHandler(removeData);
    }
    req.show ? start() : finish();
  });
}

// initialize remove repo
function start() {
  removeData.on(REMOVE_EVENT_TYPE.ADD, dataUpdateHandler);
  removeData.on(REMOVE_EVENT_TYPE.REMOVE, dataUpdateHandler);
  removeData.on(REMOVE_EVENT_TYPE.CLEAR, dataUpdateHandler);

  const elList = document.querySelectorAll(queryForPath[currentPath]);
  removeChineseFromList(elList);
}

function finish() {
  recover();

  removeData.off(REMOVE_EVENT_TYPE.ADD, dataUpdateHandler);
  removeData.off(REMOVE_EVENT_TYPE.REMOVE, dataUpdateHandler);
  removeData.off(REMOVE_EVENT_TYPE.CLEAR, dataUpdateHandler);
}

init();
