var express = require('express');
var Idea = require('../models/idea.js');

module.exports = function(app) {
  
  // GET ALL IDEAS
  app.get('/api/ideas', function(req, res){
    Idea.find().sort('-created_at').exec(function(err, ideas) {
      if (err) { 
        return res.status(404).send(err); 
      }
      res.send(ideas); 
    });    
  });

  // CREATE
  app.post('/api/ideas', function(req,res){  
    var idea = new Idea({ content: req.body.content });
    idea.save(function (err, idea) {
      Idea.create(req.body, function(err, idea){
        if (err) { 
          return res.send(err); 
        }
        console.log(idea);
        res.status(201).send(idea);
      });
    });
  });

  // GET ONE IDEA
  app.get('/api/ideas/:idea_id',function(req,res){   
    Idea.findById(req.params.idea_id, function(err, idea) {
      if (err) { 
        return res.status(404).send(err); 
      }
      res.send(idea); 
    });
  });

  // UPDATE ONE IDEA
  app.put('/api/ideas/:idea_id', function(req,res){ 
    Idea.findOneAndUpdate(req.params.idea_id, req.query.idea, function (err, idea) {
      if (err) { 
        return res.send(err); 
      }
      res.send(idea);
    });
  });

  // DELETE ONE IDEA
  app.delete('/api/ideas/:idea_id', function(req,res){   
    Idea.findByIdAndRemove(req.params.idea_id, function (err, idea) {
      if (err) { 
        return res.send(err); 
      }
      res.status(200).send('Success');
    });
  });
}