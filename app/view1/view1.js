'use strict';
angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [ '$scope', '$timeout', function($scope,$timeout) {
	$scope.times = [
		{value : 25, name : "25 (Work Period)"},
		{value : 5, name : "5 (Short Break Period)"},
		{value : 10, name :"10 (Long Break Period)"}
	];

	$scope.paused = true;

	$scope.addingCustom = false;

	$scope.workTime = $scope.times[0];
	$scope.counter = $scope.workTime.value * 60;
	$scope.remainingMinutes = Math.floor($scope.counter / 60);
	$scope.remainingSeconds = $scope.counter - $scope.remainingMinutes * 60;
    $scope.onTimeout = function(){
        $scope.counter--;
        $scope.remainingMinutes = Math.floor($scope.counter / 60);
		$scope.remainingSeconds = $scope.counter - $scope.remainingMinutes * 60;
        if ($scope.counter > 0) {
            mytimeout = $timeout($scope.onTimeout,1000);
        }
        else {
            alert("Time is up!");
            if ($scope.workTime == $scope.times[0]){
            	$scope.workTime = $scope.times[1];
            	$scope.counter = $scope.workTime.value * 60;
            	$scope.remainingMinutes = Math.floor($scope.counter / 60);
				$scope.remainingSeconds = $scope.counter - $scope.remainingMinutes * 60;
            }
            else{
            	$scope.workTime = $scope.times[0];
            	$scope.counter = $scope.workTime.value * 60;
            	$scope.remainingMinutes = Math.floor($scope.counter / 60);
				$scope.remainingSeconds = $scope.counter - $scope.remainingMinutes * 60;
            }
        }
    }
    var mytimeout;
    
    $scope.reset= function(){
        $scope.counter = $scope.workTime.value * 60;
        mytimeout = $timeout($scope.onTimeout,1000);
    }

    $scope.pause= function(){
    	$timeout.cancel(mytimeout);
    	$scope.paused = true;
    }

    $scope.resume= function(){
    	if ($scope.paused == true){
    		mytimeout = $timeout($scope.onTimeout,1000);
    		$scope.paused = false;
    	}
    }

    $scope.addCustom= function(){
    	$scope.addingCustom = true;
    }

    $scope.newCustomName = "";
    $scope.newCustomTime = 1;

    $scope.submitCustom= function(){
    	$scope.times.push(
    		{value : $scope.newCustomTime, 
    			name : $scope.newCustomTime.toString() + " ("+ $scope.newCustomName + ")"});
    	$scope.addingCustom = false;
    	$scope.newCustomName = "";
    	$scope.newCustomTime = 1;
    }

    $scope.Range = function(start, end) {
	    var result = [];
	    for (var i = start; i <= end; i++) {
	        result.push(i);
	    }
	    return result;
	}
}]);