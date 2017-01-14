/*
  Controller file for functionality dealing with user settings.
*/

var AWS = require("aws-sdk");
var config = require('../config/config');

AWS.config.update({
  region: config.aws.region,
  endpoint: config.aws.endpoint
});

module.exports = {

  checkEmail(email) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
      TableName: "BeerMeEmail2Users",
      Key:{
          "email": email
      }
    };
    docClient.get(params, function(err, data) {
      if (err) {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
          return null;
      } else {
          if (data == null) {
            return true;
          }
          return false;
          console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
      }
    });
  },

  createUser(data) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var paramsUser = {
      TableName:"BeerMeUsers",
      Item:{
          "username": data.user,
          "password": data.key,
          "name": data.name,
          "email", data.email,
          "phone", data.phone
      }
    };
    var paramsEmail = {
      TableName:"BeerMeEmail2User",
      Item:{
          "email", data.email,
          "username": data.user
      }
    };

    docClient.put(paramsUser, function(err, data) {
      if (err) {
          console.error("Unable to add user. Error JSON:", JSON.stringify(err, null, 2));
          return false;
      } else {
          console.log("Added user:", JSON.stringify(data, null, 2));
          docClient.put(paramsEmail, function(err, data) {
            if (err) {
                console.error("Unable to add email->user. Error JSON:", JSON.stringify(err, null, 2));
                return false;
            } else {
                console.log("Added email->user:", JSON.stringify(data, null, 2));
                return true;
            }
          });
      }
    });
  },

  getUserInfo(username) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
      TableName: "BeerMeUsers",
      Key:{
          "username": username
      }
    };
    docClient.get(params, function(err, data) {
      if (err) {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
          return null;
      } else {
          console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
          return data;
      }
    });
  },

  loginUser(data, password) {
    if (data.password == password) {
      // Generate token with credentials
      // Return token
    } else {
      return null;
    }
  }

}
