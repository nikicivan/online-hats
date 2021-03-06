import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
	name: {type: String, required: true},
	rating: {type: Number, default: 0},
	comment: {type: String, required: true}
}, {
	timestamps: true
})

const productSchema = new mongoose.Schema({	
	name: {type: String, required: true},
	img: {type: String, required: true},
	brand: {type: String, required: true},
	price: {type: Number, default: 0, required: true},
	category: {type: String, required: true},
	countInStock: {type: Number, default: 0, required: true},
	description: {type: String, required: true},
	rating: {type: Number, default: 0, required: true},
	numReview: {type: Number, default: 0, required: true},
	reviews: [reviewSchema]
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;