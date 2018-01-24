var { User } = require('../models/user')
var _ = require('lodash')

function index(req, res) {
  User
  .find()
  .exec(function(err, users) {
    if(err) {
      res.status(500).json({errorMessage: `Could not find user because ${err}`})
    } else if(!users) {
      res.status(404).json({errorMessage: `No users found`})
    }
    else {
      res.json(users)
    }
  })
}

function show(req, res) {
  User
  .findById(req.params.id)
  .exec(function(err, user) {
    if(err) {
      res.status(500).json({errorMessage: `Could not find user because ${err}`})
    } else if(!user) {
      res.status(404).json({errorMessage: `No user was found at id: ${req.params.id}`})
    }
    else {
      res.json(user)
    }
  })
}

function update(req, res) {
  var body = _.pick(req.body, ["id", "firstName", "lastName", "userName", "password", "email", "cellNumber", "alternateNumber", "dob", "address1", "address2", "city", "state", "zip", "pitPoints", "genre"])

  // $set allows us to set the body as the new value of the record
  // {new: true} means that what gets returned in the callback is the new record - defaults to old.
  User
  .findByIdAndUpdate(req.params.id, {$set: body}, {new: true}, function(err, user) {
    if(err) {
      res.status(500).json({errorMessage: `There was an error with our DB: ${err}`})
    }
    else if(!user) {
      res.status(404).json({errorMessage: `User Record could not be found`})
    }
    else {
      res.json(user)
    }
  })
}

function destroy(req, res) {
  User
  .findByIdAndRemove(req.params.id, function(err, user) {
    if(err) {
      res.status(500).json({errorMessage: `Could not perform delete because: ${err}`});
    } else if (!user) {
      res.status(404).json({errorMessage: `No user was found at id: ${req.params.id}`})
    }
    else {
      res.json(user)
    }
  })
}

function addUpcomingShowToUser(req, res) {
  
}

function removeUpcomingShowFromUser(req, res) {
  
}

function addPastShowToUser(req, res) {
  
}


module.exports = { index, show, update, destroy, addUpcomingShowToUser, removeUpcomingShowFromUser, addPastShowToUser }