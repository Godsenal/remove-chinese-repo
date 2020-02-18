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
    const prevInit = init;
    init = function() {
      prevInit();
      // get last target in nested DOM
      const targets = document.querySelectorAll(
        "[class*=discover-repositories]"
      );
      const target = targets[targets.length - 1];
      if (target) {
        observer = new MutationObserver(handlePagenation);
        observer.observe(target, option);

        // observer가 등록된 경우 init과 recover를 wrapping.
        const prevRecover = recover;
        recover = function() {
          observer.disconnect();
          prevRecover();
        };
      }
    };
  }
})();
