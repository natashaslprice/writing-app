/*
 * IDEA MODEL
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Pledge = require('./pledge.js');

var IdeaSchema = new Schema({
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date },
    author: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    amount_required: { type: Number, required: true },
    pledges: [Pledge.schema]
});

// MIDDLEWARE
IdeaSchema.pre('save', function(next){
  // set a created_at and update updated_at
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

// export idea model
var Idea = mongoose.model('Idea', IdeaSchema);

module.exports = Idea;
