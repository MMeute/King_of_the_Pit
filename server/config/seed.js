var { User } = require('../models/user')

var users = [];

function _User(id, firstName, lastName, userName, password, email, cellNumber, alternateNumber, dob, address1, address2, city, state, zip, pitPoints, genre) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.cellNumber = cellNumber;
    this.alternateNUmber = alternateNumber;
    this.dob = dob;
    this.address1 = address1;
    this.address2 = address2;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.pitPoints = pitPoints;
    this.genre = genre;
}

users.push(new _User(0, "Rite", "Meow", "pitBeast81", "dimelife87", 'rite.meow@gmail.com', '111-111-1111', '222-222-2222', new Date('2/8/1987'), '123 Meathead Blvd', '', 'Fullerton', 'CA', '92831', '0', 'Thrash Metal'))
users.push(new _User(1, "Tyrone", "Biggums", "tbizzle", "crackplease", "tbiggums@gmal.com", '123-456-7890', '012-345-6789', new Date('10/08/1992'), '123 Fake Street', '', 'New York City', 'NY', '42938', '0', 'Hardcore Metal'))

var seedUsers = function(req, res) {
    for (var i = 0; i < users.length; i++) {
        var newUser = new User(users[i])

        newUser.save(function(err, user) {
            if(err) console.log('Error: ' + err);
            if(user) console.log('User: ' + user);
        })
    }
    res.json({message: "Seeding Users Complete"})
}

module.exports = { seedUsers }