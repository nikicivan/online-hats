"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _product = _interopRequireDefault(require("../models/product.model"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

router.get("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var category, searchKeyword, sortOrder, products;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            category = req.query.category ? {
              category: req.query.category
            } : {};
            searchKeyword = req.query.searchKeyword ? {
              name: {
                $regex: req.query.searchKeyword,
                $option: 'i'
              }
            } : {}; //console.log(searchKeyword);

            sortOrder = req.query.sortOrder ? req.query.sortOrder === 'lowest' ? {
              price: -1
            } : {
              price: 1
            } : {
              _id: -1
            }; //console.log(sortOrder);

            _context.next = 5;
            return _product["default"].find(_objectSpread(_objectSpread({}, category), searchKeyword)).sort(sortOrder);

          case 5:
            products = _context.sent;
            res.send(products);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get("/:id", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var productId, product;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            productId = req.params.id;
            _context2.next = 3;
            return _product["default"].findOne({
              _id: productId
            });

          case 3:
            product = _context2.sent;

            if (product) {
              res.send(product);
            } else {
              res.status(404).send({
                msg: "Product not found"
              });
            }

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/:id/reviews', _util.isAuth, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var product, review, updatedProduct;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _product["default"].findById(req.params.id);

          case 2:
            product = _context3.sent;

            if (!product) {
              _context3.next = 14;
              break;
            }

            review = {
              name: req.body.name,
              rating: Number(req.body.rating),
              comment: req.body.comment
            };
            product.reviews.push(review);
            product.numReview = product.reviews.length;
            product.rating = product.reviews.reduce(function (a, c) {
              return c.rating + a;
            }, 0) / product.reviews.length;
            _context3.next = 10;
            return product.save();

          case 10:
            updatedProduct = _context3.sent;
            res.status(201).send({
              data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
              message: 'Review saved successfully.'
            });
            _context3.next = 15;
            break;

          case 14:
            res.status(404).send({
              message: 'Product Not Found'
            });

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.post("/", _util.isAuth, _util.isAdmin, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var product, newProduct;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            product = new _product["default"]({
              name: req.body.name,
              price: req.body.price,
              img: req.body.img,
              brand: req.body.brand,
              category: req.body.category,
              countInStock: req.body.countInStock,
              description: req.body.description,
              rating: req.body.rating,
              numReview: req.body.numReview
            });
            _context4.next = 3;
            return product.save();

          case 3:
            newProduct = _context4.sent;

            if (!newProduct) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(201).send({
              message: 'New Product Created',
              data: newProduct
            }));

          case 6:
            return _context4.abrupt("return", res.status(500).send({
              message: 'Error in Creating Product.'
            }));

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.put("/:id", _util.isAuth, _util.isAdmin, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var productId, product, updatedProduct;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            productId = req.params.id;
            _context5.next = 3;
            return _product["default"].findOne({
              _id: productId
            });

          case 3:
            product = _context5.sent;

            if (!product) {
              _context5.next = 17;
              break;
            }

            product.name = req.body.name;
            product.price = req.body.price;
            product.img = req.body.img;
            product.brand = req.body.brand;
            product.category = req.body.category;
            product.countInStock = req.body.countInStock;
            product.description = req.body.description;
            _context5.next = 14;
            return product.save();

          case 14:
            updatedProduct = _context5.sent;

            if (!updatedProduct) {
              _context5.next = 17;
              break;
            }

            return _context5.abrupt("return", res.status(200).send({
              message: 'Product updated',
              data: updatedProduct
            }));

          case 17:
            return _context5.abrupt("return", res.status(500).send({
              message: 'Error in Updating Product.'
            }));

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
router["delete"]("/:id", _util.isAuth, _util.isAdmin, /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var deletedProduct;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _product["default"].findById(req.params.id);

          case 2:
            deletedProduct = _context6.sent;

            if (!deletedProduct) {
              _context6.next = 9;
              break;
            }

            _context6.next = 6;
            return deletedProduct.remove();

          case 6:
            res.send({
              msg: 'Product deleted.'
            });
            _context6.next = 10;
            break;

          case 9:
            res.send("Error in deletion");

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;