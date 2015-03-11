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
angular.module('app.routes', ['ui.router']);

angular.module('app.routes')
/**
 * We define a provider to provide the routes to a config function.
 * This is the ui-route actual implementation
 * */
  .provider('routes', ['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      this.$get = function () {

        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");
        //
        // Now set up the states
        $stateProvider.state('home', {
          url: "/",
          templateUrl: "assets/partials/home.html",
          controller: 'HomeCtrl'
        })
        $stateProvider.state('section', {
          url: "/section",
          templateUrl: "assets/partials/section.html"
        })

      };
      return this;
    }
  ]);
angular.module('app.routes')
/**
 * We inject the routesProvider to the config function and initialize it
 * */
  .config(['routesProvider',
    function (routes) {
      routes.$get();
    }
  ]);

//angular.module('app.routes').run(['$rootScope', '$state', '$q', 'User', '$window',
//  function ($rootScope, $state, $q, User, $window) {
//
//    /**
//     * This function listens to state changes to do some ruling for
//     * the routes. Specially for auth purposes (preventing users to
//     * access routes they should not).
//     * */
//    $rootScope.$on('$stateChangeStart', function (e, to) {
//      //this line is used to create user globals and session globals
//      // var for routes that don't need auth
//      if (to.needsAuth) {
//        User.buildSession().catch(function () {
//          $state.go('login');
//        });
//      } else {
//        User.buildSession();
//      }
//      $window.scrollTo(0, 0)
//
//    });
//  }
//]);
app.controller('HomeCtrl', ['$scope', '$rootScope',
  function ($scope, $rootScope) {
    console.log('home');
    $scope.stack = ['Angular', 'Sass', 'Bourbon', 'Jade']
  }
]);


app.controller('MainCtrl', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
    }
  ]);

