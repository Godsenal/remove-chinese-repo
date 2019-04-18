const query = queryForPath[currentPath];
const page = isLazyPage
  ? new LazyloadPage(query, lazyTarget)
  : new BasePage(query);
