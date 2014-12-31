var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoastSchema = new Schema({
		date: Date,
		rating: Number,
		notes: String,
		beans:[
			{type: Schema.Types.ObjectId, ref: 'bean'}
		]
});

module.exports = mongoose.model('Roast', RoastSchema);