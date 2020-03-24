const router = require('express').Router(); //express router
let User = require('../models/user.model'); //mongo model

router.route('/').get((req, res) => {   // route handles incomming http requests
  User.find()                           // get request in user/
    .then(users => res.json(users))   // fetch all users from mongo atlas user database and returns in json format
    .catch(err => res.status(400).json('Error: ' + err));  // error message
});

router.route('/add').post((req, res) => {   //impoint handles post requests
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;  // exporting router