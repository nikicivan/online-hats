import express from 'express';
import data from './data';

import config from './config';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoute from './routes/user.route';
import productRoute from './routes/product.route';
import orderRoute from './routes/order.route';
import uploadRoute from './routes/uploadRoute';

const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/config/paypal', (req, res) => {
	res.send(config.PAYPAL_CLIENT_ID)
});
app.use('/uploads', express.static('uploads'));


/*app.get('/api/products', (req, res)=> {
	res.send(data.products);
});
app.get('/api/products/:id', (req, res)=> {
	const productId = req.params.id;
	const product = data.products.find(x => x.id == productId);
	if(product)
		res.send(product);
	else
		res.status(404).send({msg: "Product Not Found."});
});*/

app.listen(config.PORT, ()=> {
	console.log("Server started at http://localhost:5000");
});