angular.module('HeaderModule', [])
.factory("Data", function(){
	return {
		getTitle: function() {
			return "A better title.";
		}
	}
})
.filter('customuppercase', function(){
	return function(input) {
		if(input.length > 20) {
			return input.toUpperCase();
		}else{
			return input;
		}
	};
})
.controller('HeaderController', function($scope) {
	$scope.title = "Hello World";
	$scope.updateTitle = function() {
		$scope.title = "That's a new title.";
	}
});