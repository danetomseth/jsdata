'use strict'; 

app.config(function($stateProvider) {
	$stateProvider.state('post', {
		url: '/post/:postId',
		templateUrl: 'js/post/post.html',
		controller: 'PostCtrl',
		resolve: {
			users: function(User) {
				return User.findAll();
			},
			singlePost: function(Post, users, $stateParams) {
				return Post.find($stateParams.postId)
			}
		} 
		/*
				add a resolve block that retrieves all the users
				so that the author field of the posts will be automatically 
				populated
		*/
	})
});

// add necessary dependencies 
app.controller('PostCtrl', function($scope, users, singlePost, Post, User, $state, $stateParams) {


	/* 1. FIND POST
		use state params to retrieve the post id and attach post object to scope 
		on controller load 
	*/
	//$scope.userPost = $scope.userPost.data;
	$scope.userPost = singlePost

	// console.log(singlePost);
	// console.log(users);


	/*
		2. EDIT POST 
		create a function that edits the post, adds an alert that the post has been 
		successfully edited, and displays the edited post.  

	*/
	$scope.editPost = function () {
		$scope.editing = true;
	};

	$scope.editCurrentPost = function (userPost) {
		Post.update(userPost._id, userPost)
		.then(function () {
			// $state.go('post', {postId: userPost._id});
			$scope.editing = false;
		});

	}

})