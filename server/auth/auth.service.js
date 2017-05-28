import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import pify from 'pify';
import User from '../api/user/user.model';
import createError from 'http-errors';

if (!process.env.SESSION_SECRET) {
  process.env.SESSION_SECRET = 'this secret is for prod on local machine only!';
}

const validateJwt = pify(expressJwt({secret: process.env.SESSION_SECRET}));

export function isAuthenticated () {
  return (req, res) => {
    // Allow access_token to be passed through query parameter as well
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = `Bearer ${req.query.access_token}`;
    }

    return validateJwt(req, res)
      .then(() => User.findById(req.user._id))
      .then(user => {
        if (!user) {
          return Promise.reject(createError(401));
        }

        req.user = user;
      });
  };
}

export function isAdmin () {
  return (req, res) => {
    return isAuthenticated()(req, res)
      .then(() => {
        if (!req.user.admin) {
          return Promise.reject(createError(403));
        }
      });
  };
}

export function signToken (_id, expiresIn = '7d') {
  return jwt.sign({_id}, process.env.SESSION_SECRET, {expiresIn});
}

