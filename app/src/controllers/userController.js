app.controller("userController", function($scope, $state, $stateParams, userService) {
  
    $scope.userSearch = "";
  
    if($stateParams.id == "" || $stateParams.id == undefined || $stateParams.id == null) {
      $scope.submitButton = true;
      $scope.heading = "Create A User!"
  
      userService.getUserById($stateParams.id, function(user) {
        $scope.user = user;
      })
    }
    else {
      $scope.submitButton = false;
      $scope.heading = "Update User"
  
      userService.getUserById($stateParams.id, function(user) {
        $scope.user = user;
      })
    }
  
    userService.getUsers()
      .then(function(response) {
        $scope.users = response.data
      },
      function(error) {
        console.log(error);
      })
  
    $scope.addUser = function() {
      userService.addUser($scope.user)
        .then(function(response) {
          console.log(response.data);
          $state.go('usersShow', {id: response.data._id})
        },
        function(error) {
          console.log(error);
        })
    }
  
    $scope.updateUser = function() {
      userService.updateUser($scope.user)
        .then(function(response) {
          $state.go('usersShow', {id: response.data._id})
        },
        function(error) {
          console.log(error);
        })
    }
  
    $scope.deleteUser = function() {
      userService.deleteUser($stateParams.id)
        .then(function(response) {
          $state.go('users')
        },
        function(error) {
          console.log(error);
        })
    }
  
  });