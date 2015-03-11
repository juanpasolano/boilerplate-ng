app.controller('HomeCtrl', ['$scope', '$rootScope',
  function ($scope, $rootScope) {
    console.log('home');
    $scope.stack = ['Angular', 'Sass', 'Bourbon', 'Jade']
  }
]);

