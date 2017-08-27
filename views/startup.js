(function () {
  var searchQuery = location.search.split('?')[1];
  if (!searchQuery) {
    return;
  }
  var hashQuery = location.hash.split('?')[1];
  var newUrl = '//' + location.host + (location.hash ? location.hash : '/#/');
  if (!hashQuery) {
    newUrl = newUrl + '?' + searchQuery;
  } else if (searchQuery) {
    newUrl =  newUrl + '&' + searchQuery;
  }
  location.replace(newUrl);
})();
