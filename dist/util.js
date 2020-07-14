"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = exports.isAuth = exports.getToken = void 0;

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var jwt = require('jsonwebtoken');

var getToken = function getToken(user) {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }, _config["default"].JWT_SECRET, {
    expiresIn: '48h'
  }); //console.log(getToken);
};
/*const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if(!token) {
    res.status(401).send({ message: 'Token is not supplied' });
  } else {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, data) => {
      if(err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.data = data;
        next();
      }
    });
  }
};*/


exports.getToken = getToken;

var isAuth = function isAuth(req, res, next) {
  var token = req.headers.authorization; //console.log(token);

  if (token) {
    var onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, _config["default"].JWT_SECRET, function (err, decode) {
      if (err) {
        console.log(err);
        return res.status(401).send({
          message: 'Invalid Token'
        });
      }

      req.user = decode; //console.log(decode);

      next();
      return;
    });
  } else {
    return res.status(401).send({
      message: 'Token is not supplied.'
    });
  }
};

exports.isAuth = isAuth;

var isAdmin = function isAdmin(req, res, next) {
  //console.log(req.user);
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    return res.status(401).send({
      message: 'Admin Token is not valid.'
    });
  }
};

exports.isAdmin = isAdmin;