'use strict';
var amazon = require('amazon-product-api');
/**
 * Render the main application page
 */
  amazon = amazon.createClient({
      awsId: "AKIAJ7AGDJDFA3BM7XPA",
      awsSecret: "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",
      awsTag: "thesmartking-21"
  });

exports.renderIndex = function (req, res) {
    res.render('modules/core/server/views/index', {
    user: req.user || null
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};

exports.amazonApi = function (req, res) {

    console.log('myamazon::india');

    amazon.itemSearch({
        director: 'Quentin Tarantino',
        actor: 'Samuel L. Jackson',
        searchIndex: 'DVD',
        audienceRating: 'R',
        responseGroup: 'ItemAttributes,Offers,Images'
    }).then(function(results){
        console.log('amazon::'+JSON.stringify(results[0]));
        alert(results);
    }).catch(function(err){
        alert(err);
        console.log('amazon::'+err);
    });

};
