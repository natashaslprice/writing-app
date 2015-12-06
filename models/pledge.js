/*
 * PLEDGE MODEL
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PledgeSchema = new Schema({
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date },
    pledger: { type: String, required: true, trim: true },
    comments: { type: String, required: true, trim: true },
    amount_pledged: { type: Number, required: true }
});

// MIDDLEWARE
PledgeSchema.pre('save', function(next){
  // set a created_at and update updated_at
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

// export idea model
var Pledge = mongoose.model('Pledge', PledgeSchema);

module.exports = Pledge;
