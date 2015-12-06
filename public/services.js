/*
 * SERVICES
 */

'use strict';

angular.module('myApp.services', [])
  .factory('Idea', function ($window, $resource) {
    return $resource($window.location.origin + '/api/ideas/:id', { id: '@id' }, {
      update: { method: 'PUT'} 
    });
  })

  .factory('Pledge', function ($window, $resource) {
    return $resource($window.location.origin + '/api/ideas/:id/pledges/:pledgeId', { id: '@id' }, {
      update: { method: 'PUT'} 
    });
  });