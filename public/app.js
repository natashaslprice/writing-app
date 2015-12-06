/*
 * ANGULAR APP.JS
 */

'use strict';

angular.module('myApp', ['ui.router',
                         'ngResource',
                         'myApp.controllers',
                         'myApp.services'])

  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('ideas', {
        url: "/",
        templateUrl: 'templates/ideas-index',
        controller: 'IdeasIndexCtrl'
      })

      .state('idea-show', {
        url: "/ideas/:id",
        templateUrl: 'templates/idea-show',
        controller: 'IdeaShowCtrl'
      });

      
    $urlRouterProvider.otherwise("/state1");

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  }]);
