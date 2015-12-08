var express = require('express');
var Idea = require('../models/idea.js');
var Pledge = require('../models/pledge.js');

module.exports = function(app) {
  
  // GET ALL PLEDGES
  app.get('/api/ideas/:idea_id', function(req, res) {
    Idea.findById(req.params.idea_id, function(err, idea) {
      if (err) { 
        return res.status(404).send(err); 
      }
      console.log("idea here", idea);
      res.send(idea); 
    });
  });

  // CREATE
  app.post('/api/ideas/:idea_id/pledges', function(req,res) {
    var pledge = new Pledge(req.body);
  	console.log("pledge: ", pledge);
    Idea.findById(req.params.idea_id, function(err, idea) {
    	if (err) { 
        return res.status(404).send(err); 
      }
      idea.pledges.push(pledge);
      // console.log("idea after push: ", idea.pledges);
	    idea.save(function (err, idea) {
	      if (err) { 
          return res.send(err); 
        }
        res.send(pledge);
      });
    });
  });

  // DELETE
  app.delete('/api/ideas/:idea_id/pledges/:pledge_id', function (req, res) {
  // set the value of the idea and pledge ids
  var ideaId = req.params.idea_id;
  var pledgeId = req.params.pledge_id;
  // console.log("here", ideaId, pledgeId);

  // find idea by id
  Idea.findOne({_id: ideaId}, function (err, idea) {
    // find pledge embedded in idea
    var pledge = idea.pledges.id(pledgeId);
    // remove pledge
    pledge.remove();
    idea.save(function (err, savedIdea) {
      // console.log(idea);
      res.status(200).send('Success');
    });
  });
});
};