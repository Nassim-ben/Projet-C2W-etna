const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ProductsSchema = new Schema({
	name: { type: String, required: true},
  	price: { type: Number, required: true},
  	description: { type: String, required: true},
	coverImageName:{type: String, required: true},
	UserID: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Users'
	}
}, { timestamps: true });

module.exports = mongoose.model("Products", ProductsSchema);
