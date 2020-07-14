"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), ".jpg"));
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});

var router = _express["default"].Router();

router.post('/', upload.single('image'), function (req, res) {
  res.send("/".concat(req.file.path));
});

_awsSdk["default"].config.update({
  accessKeyId: _config["default"].accessKeyId,
  secretAccessKey: _config["default"].secretAccessKey
});

var s3 = new _awsSdk["default"].S3();
var storageS3 = (0, _multerS["default"])({
  s3: s3,
  bucket: 'online-hats-bucket',
  acl: 'public-read',
  contentType: _multerS["default"].AUTO_CONTENT_TYPE,
  key: function key(req, file, cb) {
    cb(null, file.originalname);
  }
});
var uploadS3 = (0, _multer["default"])({
  storage: storageS3
});
router.post('/s3', uploadS3.single('image'), function (req, res) {
  res.send(req.file.location);
});
var _default = router;
exports["default"] = _default;