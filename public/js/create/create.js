'use strict'; 

app.config(function($stateProvider) {
	$stateProvider.state('create', {
		url: '/create/:userId',
		templateUrl: 'js/create/create.html',
		controller: 'CreateCtrl',
		resolve: {
			author: function($stateParams, User) {
				return User.find($stateParams.userId);
			}
		} 
		
	})
})

// add necessary dependencies here 
app.controller('CreateCtrl', function($scope, author) {

	$scope.previewTrue = false;

	$scope.preview = function() {
		$scope.previewTrue = !$scope.previewTrue;
	};
	$scope.author = author;
	
	$scope.newPost = {};
	$scope.newPost.name = author.username;
	$scope.newPost.author = author;

	$scope.createNewPost = function () {
		// console.log($scope.newPost);
		Post.create($scope.newPost)
		.then(function(data) {
			console.log(data);
		});
	};

	



	/*

	TODOS: 
	1 - create the object that the form can use via ng-model
  2 - create a function that 
	 		a) persists the ng-modeled post object 
			b) changes the state to 'main'  

	*/
	
}) 