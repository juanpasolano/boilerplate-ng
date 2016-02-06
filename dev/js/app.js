// Check if a new cache is available on page load.
window.addEventListener('load', function (e) {
  window.applicationCache.addEventListener('updateready', function (e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      window.location.reload();
    }
  }, false);

}, false);

var app = angular.module('ubicalaCMS', [
  'app.routes',
  'ui.router',
  'ngAnimate'
]);
