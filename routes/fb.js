
module.exports = function(app, config, aws) {

  app.use(function(req, res, next) {
    next();
  });

  app.get('/fb', function(req, res) {
    res.send('FB Route');
  });

};
