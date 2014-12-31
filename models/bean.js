var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BeanSchema = new Schema({
		name: String
});

module.exports = mongoose.model('Bean', BeanSchema);