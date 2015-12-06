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
        console.log(idea);
        res.status(201).send(idea);
      });
    });
  });
};