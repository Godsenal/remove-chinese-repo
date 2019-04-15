(function() {
  const elList = document.querySelectorAll(queryForPath[currentPath]);
  removeChineseFromList(elList);
})();

function removeChineseFromList(list) {
  list.forEach(el => {
    const title = el.querySelector(defaultTitle);
    const description = el.querySelector(defaultDescription);
    const hasChinese = [title, description].some(item => {
      return item && checkChinese(item.innerHTML);
    });
    if (hasChinese) {
      el.className = `remove-chinese-invisible ${el.className.split(" ")}`;
    }
  });
}
