const express = require('express');
const  ProtectedRoutes = express.Router(); 
ProtectedRoutes.use((req, res, next) =>{
    let token = req.headers['x-access-token'] || req.headers['authorization']; 
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }
    const jwt = require('jsonwebtoken');
    //console.log(req.headers);
    if (token) {
      jwt.verify(token,require('../../config/keys').secretOrKey, (err, decoded) =>{      
        if (err) {
          return res.status(403).json({ message: 'invalid token' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          message: 'No token provided.' 
      });
    }
  });

  module.exports = ProtectedRoutes;