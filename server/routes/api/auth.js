const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const mongoose = require('mongoose');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/user');
const util = require('./utility')

router.put('/cp/:id', (req, res) => {
  let password = bcrypt.hashSync(req.body.password);
  User.findByIdAndUpdate(mongoose.mongo.ObjectId(req.params.id), { $set: { password: password } }, function (err, user) {
    if (err) return res.status(400).json(err);
    return res.status(200).json({ msg: "success" });
  });
});


/**
* @swagger
* /register:
*   post:
*     tags:
*       - Auth
*     summary: Registration for Users
*     description: User Registration 
*     parameters:
*       - in: body
*         name: Registration
*         description: Registration User.
*         schema:
*           type: object
*           required:
*             - name
*             - email
*             - password
*           properties:
*             name:
*               type: string
*             email:
*               type: string
*             password:
*               type: string     
*     responses:
*       200:
*         description: Will return the Success Message
*       401: 
*         description: 'If Error in Input parameters'   
*/
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(401).json({ error: 'Email is already registered with us', status: 0 });
    } else {
      const newUser = new User(req.body);
      newUser.password = bcrypt.hashSync(req.body.password);
      let id = util.getNextSequenceValue('user');
      id.then(v => {
        newUser.Id = v.toString();
        newUser
          .save()
          .then(user => {
            res.status(200).json({ msg: "Registration was successful. Go for Login!" });
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      });
    }
  });
});

/**
* @swagger
* /login:
*   post:
*     tags:
*       - Auth
*     summary: Login for Users
*     description: User Login 
*     parameters:
*       - in: body
*         name: Login
*         description: Login Authentication.
*         schema:
*           type: object
*           required:
*             - email
*             - password
*           properties:
*             email:
*               type: string
*             password:
*               type: string     
*     responses:
*       200:
*         description: Will return the token
*         content:
*           application/json:
*             schema:             
*               $ref: '#/components/schemas/Login' 
*       403: 
*         description: 'UnAuthorized Access'   
*/
router.post('/login', (req, res) => {
  console.log(keys.secretOrKey);

  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'user not found';
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {

        const payload = { id: user.Id, name: user.name };
        let e = util.deepClone(user);
        delete e.password;
        let refreshToken = jwt.sign(payload, keys.secretOrKey)
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              payload: payload,
              refreshToken: refreshToken,
              token: 'Bearer ' + token,
              user: e
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

router.put('/logout/:id', (req, res) => {
  User.findByIdAndUpdate(mongoose.mongo.ObjectId(req.params.id), { online: false }, function (err, user) {
    if (err) return res.status(400).json(err);
    return res.status(200).json({ msg: "success" });
  });
});

router.post("/api/token", (req, res) => {
  let token = jwt.sign(req.body.payload, keys.secretOrKey, { expiresIn: "1m" })
  res.status(200).json({ token });
});

module.exports = router;