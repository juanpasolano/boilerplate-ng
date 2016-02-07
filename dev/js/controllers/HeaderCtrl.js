app.controller('HeaderCtrl', ['$scope', '$rootScope',
function ($scope, $rootScope) {
  // Top Search
  this.openSearch = function(){
    angular.element('#header').addClass('search-toggled');
    angular.element('#top-search-wrap').find('input').focus();
  };

  this.closeSearch = function(){
    angular.element('#header').removeClass('search-toggled');
  };
}
]);
