(function() {
  let observer;
  const option = { childList: true };
  function handlePagenation(mutations) {
    const { target } = mutations[0];
    const nextTarget = target.querySelector("[class*=discover-repositories]");
    observer.disconnect();
    if (nextTarget) {
      removeChineseFromList(
        nextTarget.querySelectorAll(queryForPath[currentPath])
      );
      observer.observe(nextTarget, option);
    }
  }
  // discover page의 load pagination은 document load가 되지 않으므로 mutation observer를 통해 관리해준다.
  if (currentPath === "/discover") {
    const target = document.querySelector("[class*=discover-repositories]");
    if (target) {
      observer = new MutationObserver(handlePagenation);
      observer.observe(target, option);
    }
  }
})();
