"use strict";

var _express = _interopRequireDefault(require("express"));

var _data = _interopRequireDefault(require("./data"));

var _config = _interopRequireDefault(require("./config"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _user = _interopRequireDefault(require("./routes/user.route"));

var _product = _interopRequireDefault(require("./routes/product.route"));

var _order = _interopRequireDefault(require("./routes/order.route"));

var _uploadRoute = _interopRequireDefault(require("./routes/uploadRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mongodbUrl = _config["default"].MONGODB_URL;

_mongoose["default"].connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})["catch"](function (error) {
  return console.log(error.reason);
});

var app = (0, _express["default"])();
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use('/api/uploads', _uploadRoute["default"]);
app.use('/api/users', _user["default"]);
app.use('/api/products', _product["default"]);
app.use('/api/orders', _order["default"]);
app.use('/api/config/paypal', function (req, res) {
  res.send(_config["default"].PAYPAL_CLIENT_ID);
});
app.use('/uploads', _express["default"]["static"]('uploads'));
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

app.listen(_config["default"].PORT, function () {
  console.log("Server started at http://localhost:5000");
});