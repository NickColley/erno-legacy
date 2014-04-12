'use strict';

angular.module('erno.controllers', [])

.controller('MainCtrl', ['$scope', function ($scope) {

	var scramble = new scrambo();

	$scope.currentScramble = scramble.get();

	$scope.scrambleType = function($scope) {
		console.log(this);
	};

	$scope.scramble = function(){
		$scope.currentScramble = scramble.type($scope.type).get();
	};

	$scope.types = function(){
		return	[
			'222',
			'333',
			'444',
			'555',
			'666',
			'777',
			'clock',
			'pyram',
			'sq1'
		]
	};

	$scope.type = $scope.types()[0];

	$scope.$watch('type', function(data) {
		if(data) $scope.scramble();
	});

}]);