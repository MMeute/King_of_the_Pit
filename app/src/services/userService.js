app.service("userService", function ($http) {

this.getUsers = function () {
  return $http.get('./api/users')
}

this.getUserById = function (id, cb) {
  if (id == "" || id == undefined || id == null) {
    var user = {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      email: "",
      cellNumber: "",
      alternateNumber: "",
      dob: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      pitpoints: "",
      genre: "",
      pastShows: ""
      
    }
    cb(user)
  } else {
    $http.get('./api/users/' + id)
      .then(function (response) {
          console.log(response.data);
          cb(response.data);
        },
        function (error) {
          console.log(error);
        })
  }
}

this.addUser = function (user) {
  return $http.post('./api/users', user)
}

this.updateUser = function (user) {
  return $http.put('./api/users/' + user._id, user)
}

this.deleteUser = function (id) {
  return $http.delete('./api/users/' + id)
}
})