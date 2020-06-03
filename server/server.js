var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
var port = 4000;
var request = require('request');
var fs = require('fs');
var path = require('path');
var nodeCache = require('node-cache');

var loggedInUserCache = new nodeCache();

// Server setup modules
var httpServer = http.Server(app);

// Increasing limit to allow for larger data in network requests eg. ProvisionDetails
// support encoded bodies
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));
// Parses the text as JSON and exposes the resulting object on req.body
app.use(bodyParser.json({
  limit: '50mb'
}));

// Set up the headers allowed by the app
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, Origin, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.listen(port, () => console.log(`Application listening on port ${port}!`));

app.get('/credentials', function (req, res) {
  const userData = req.query;
  fs.readFile(path.join(__dirname, '../datastore/users.json'), function (err, data) {
    if (!err) {
      const retData = JSON.parse(data);
      let isUserExists = {};
      const fetchedUser = {};
      retData.users.find(item => {
        if ((item.emailAddress === userData.username && item.userPassword !== userData.password) || (item.emailAddress !== userData.username && item.userPassword === userData.password)) {
          isUserExists.isValueMismatch = true;
        } else if (item.emailAddress === userData.username && item.userPassword === userData.password) {
          isUserExists.isUserAvailable = true;
          return Object.assign(fetchedUser, item);
        } else {
          return isUserExists.isUserAvailable = false;
        }
      });

      if (isUserExists.isValueMismatch) {
        isUserExists.isValueMismatch ? res.send({
          response: 'There seems to be a mismatch with the provided credentials. Please use the Recover Password screen to recover your password.'
        }) : null;
      } else if (isUserExists.isUserAvailable) {
        res.send({
          fetchedUser
        })
      } else if (!isUserExists.isUserAvailable) {
        res.send({
          response: 'You do not seem to be registered with us. Please register yourself and retry.'
        })
      }
    }
  });
});

app.post('/register', function (req, res) {
  const userData = req.body;
  fs.readFile(path.join(__dirname, '../datastore/users.json'), function (err, data) {
    if (!err) {
      const retData = JSON.parse(data);
      let isUserExist = false;
      if (retData.users.length > 0) {
        retData.users.find(item => {
          return item.emailAddress === userData.emailAddress ? isUserExist = true : false;
        })
      }
      isUserExist ? res.send({
        response: 'This email address is already registered. Please use the Sign In screen or the Forgot Password option to retreive your password.'
      }) : writeToFile('users.json', retData, userData, res);
    } else {
      res.send(err);
    }
  });
});

function writeToFile(fileName, retData, userData, res) {
  retData.users.push(userData);
  fs.writeFile(path.join(__dirname, '../datastore/' + fileName), JSON.stringify(retData), function (err, data) {
    if (!err) {
      res.send({
        response: null
      });
    } else {
      res.send(error);
    }
  })
}

app.get('/retreive', function (req, res) {
  const query = req.query;
  fs.readFile(path.join(__dirname, '../datastore/users.json'), function (err, data) {
    if (!err) {
      let userFound = false;
      const retData = JSON.parse(data);
      const resultData = {};
      retData.users.find(item => {
        if (item.emailAddress === query.emailAddress) {
          userFound = true;
          return Object.assign(resultData, item);
        } else {
          return userFound = false;
        }
      });
      userFound ? res.send({
        response: resultData
      }) : res.send({
        status: "404",
        statusText: 'Sorry, we could not find any data matching the provided criteria. Please re-verify and try again.'
      });
    }
  })
});

app.post('/saveLoggedInUser', function (req, res) {
  const loggedInUser = req.body;
  const savedUser = loggedInUserCache.keys();
  if (savedUser.length > 0) {
    loggedInUserCache.del('loggedInUser');
  }
  loggedInUserCache.set('loggedInUser', loggedInUser);
  res.send({
    response: 'User Saved'
  })
})

app.get('/loggedInUser', function (req, res) {
  const savedUser = loggedInUserCache.get('loggedInUser');
  res.send({
    data: savedUser
  })
})

app.delete('/deleteSavedUser', function (req, res) {
  const savedUser = loggedInUserCache.keys();
  if (savedUser.length > 0) {
    loggedInUserCache.del('loggedInUser');
  };
  res.send({
    response: 'User Deleted'
  })
})