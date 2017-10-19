// 这个脚本是干哈呢?
(function () {
  const searchQuery = location.search.split('?')[1];
  if (!searchQuery) {
    return;
  }
  const hashQuery = location.hash.split('?')[1];
  let newUrl = `//${location.host}${location.hash ? location.hash : '/#/'}`;
  if (!hashQuery) {
    newUrl = `${newUrl}?${searchQuery}`;
  } else if (searchQuery) {
    newUrl = `${newUrl}&${searchQuery}`;
  }
  location.replace(newUrl);
}());
