class BasePage {
  constructor(query) {
    this.query = query;
    this.removed = new Set();
    this.title = "h1, h2, h3";
    this.description = ".text-gray";
  }
  checkChinese = str => {
    return str.match(/[\u3400-\u9FBF]/);
  };
  removeChineseFromList(list) {
    list.forEach(el => {
      const title = el.querySelector(this.title);
      const description = el.querySelector(this.description);
      const hasChinese = [title, description].some(item => {
        return item && this.checkChinese(item.innerHTML);
      });
      if (hasChinese) {
        this.removed.add(el);
        el.className = `remove-chinese-invisible ${
          el.className ? el.className.split(" ") : ""
        }`;
      }
    });
  }
  // initialize remove repo
  init() {
    const elList = document.querySelectorAll(this.query);
    this.removeChineseFromList(elList);
  }
  // recover all removed repo
  recover() {
    this.removed.forEach(el => {
      el.classList.remove("remove-chinese-invisible");
      if (el.className) {
        el.className = el.className.replace(/,/g, " ");
      }
    });
  }
}

class LazyloadPage extends BasePage {
  constructor(query, lazyTarget) {
    super(query);
    this.lazyTarget = lazyTarget;
    this.option = { childList: true };
    this.targets = document.querySelectorAll(lazyTarget);
    this.target = this.targets[this.targets.length - 1];
    if (this.target) {
      this.observer = new MutationObserver(this.handlePagenation);
      this.observer.observe(this.target, this.option);
    }
  }
  handlePagenation(mutations) {
    const { target } = mutations[0];
    const nextTarget = target.querySelector(this.lazyTarget);
    this.observer.disconnect();
    if (nextTarget) {
      this.removeChineseFromList(nextTarget.querySelectorAll(this.query));
      this.observer.observe(nextTarget, this.option);
      this.target = nextTarget;
    }
  }
  recover() {
    if (this.observer) {
      this.observer.disconnect();
    }
    super.recover();
  }
}
