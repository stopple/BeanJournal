var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var stopple = 'whats up';

var BeanSchema = new Schema({
		name: String
});

module.exports = mongoose.model('Bean', BeanSchema);
