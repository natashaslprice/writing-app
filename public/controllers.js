/*
 * CONTROLLERS
 */

'use strict';

angular.module('myApp.controllers', [])
  .controller('MainCtrl', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
    // INITIALIZATION AND NAVBAR LOGIC
  }])

  // IDEAS INDEX CTRL
  .controller('IdeasIndexCtrl', ['Idea', '$scope', function (Idea, $scope) {
    // GET ALL IDEAS
    $scope.ideas = Idea.query();

    // CREATE AN IDEA    
    $scope.createIdea = function() {
      var idea = new Idea($scope.idea);
      idea.$save(function(data) {
        $scope.ideas.unshift(data);
        $scope.idea = {};
      });
    };

    // DELETE AN IDEA
    $scope.deleteIdea = function(idea, index) {
      Idea.remove({ id: idea._id }, function(data) {
        $scope.ideas.splice(index, 1);
      });
    };
  }])

  // IDEAS SHOW CTRL
  .controller('IdeaShowCtrl', ['Idea', '$scope', '$stateParams', function (Idea, $scope, $stateParams) {
    // GET ONE IDEA
    Idea.get({ id: $stateParams.id }, function(data) {
      $scope.idea = data;
      // console.log($scope.idea);
    });
  }])

  // PLEDGE INDEX CTRL
  .controller('PledgeIndexCtrl', ['Idea', 'Pledge', '$scope', '$stateParams', function (Idea, Pledge, $scope, $stateParams) {
    // GET ALL PLEDGES THROUGH IDEAS
    Idea.get({ id: $stateParams.id }, function(data) {
      var idea = data;
      $scope.pledges = idea.pledges;
      console.log($scope.pledges[0]);
    });

    // CREATE A PLEDGE
    $scope.createPledge = function() {
      // console.log($stateParams);
      var pledge = new Pledge($scope.pledge);
      pledge.$save({ id: $stateParams.id }, function(data) {
        $scope.pledges.unshift(data);
        $scope.pledge = {};
      });
    };
  }]);
