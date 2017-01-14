
module.exports = function(app, config, aws) {

  app.use(function(req, res, next) {
    next();
  });

  app.get('/dw', function(req, res) {
    res.send('Dwolla Route');
  });

};
