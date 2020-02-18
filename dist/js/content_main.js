// initialize remove repo
function init() {
  const elList = document.querySelectorAll(queryForPath[currentPath]);
  removeChineseFromList(elList);
}
// recover all removed repo
function recover() {
  removed.forEach(el => {
    el.classList.remove("remove-chinese-invisible");
    if (el.className) {
      el.className = el.className.replace(/,/g, " ");
    }
  });
}
