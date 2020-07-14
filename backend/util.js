var jwt = require('jsonwebtoken');
import config from './config';

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
  //console.log(getToken);
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

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  //console.log(token);
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        console.log(err);
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.user = decode;
      //console.log(decode);
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: 'Token is not supplied.' });
  }
};

const isAdmin = (req, res, next) => {
  //console.log(req.user);
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    return res.status(401).send({ message: 'Admin Token is not valid.' });
  }  
};

export { getToken, isAuth, isAdmin };