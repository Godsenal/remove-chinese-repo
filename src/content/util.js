import { defaultTitle, defaultDescription } from "./constants";
import removeData from "./data";

const checkChinese = str => {
  return str.match(/[\u3400-\u9FBF]/);
};
export function removeChineseFromList(list) {
  list.forEach(el => {
    const title = el.querySelector(defaultTitle);
    const description = el.querySelector(defaultDescription);
    const hasChinese = [title, description].some(item => {
      return item && checkChinese(item.innerHTML);
    });
    if (hasChinese) {
      removeData.add(el);
      el.className = `remove-chinese-invisible ${
        el.className ? el.className.split(" ") : ""
      }`;
    }
  });
}
// recover all removed repo
export function recover() {
  removeData.forEach(el => {
    el.classList.remove("remove-chinese-invisible");
    if (el.className) {
      el.className = el.className.replace(/,/g, " ");
    }
  });
  removeData.clear();
}
