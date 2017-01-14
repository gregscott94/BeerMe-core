
var UserController = require('../controllers/user');

module.exports = function(app, config, aws) {

  app.use(function(req, res, next) {
    next();
  });

  app.get('/', function(req, res) {
    res.send('BeerMe App Server')
  });

  app.post('/createUser', function(req, res) {
    if (req.body.requestType == 'createUser') {
      if (UserController.checkEmail(req.body.requestData.email) == false) {
        // Set response to say email already used
      } else if (UserController.getUserInfo(req.body.requestData.username) != null) {
        // Set response to say username already used
      } else {
        var result = UserController.createUser(req.body.requestData);
        if (result) {
          // Set response to say User added
        } else {
          // Set response to say User was not added
        }
      }
    } else {
      // Invalid request
    }
  });

  app.get('checkToken', function(req, res) {
    // check token to see if user is logged in
  });

  app.post('loginUser', function(req, res) {
    if (req.body.requestType == 'loginUser' && req.body.requestData.username \
        && req.body.requestData.password) {
      var userData = UserController.getUserInfo(req.body.requestData.username);
      if (userData != null) {
        var loginResult = UserController.loginUser(userData, req.body.requestData.password);
        if (loginResult != null) {
          // return token in response
        } else {
          // password and username do not match
        }
      } else {
        // password and username do not match
      }
    } else {
      // Invalid request
    }
  });
};
