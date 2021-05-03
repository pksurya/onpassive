require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../../models/user');

const async = require('async');
const crypto = require('crypto');

var nodemailer = require('nodemailer');
const { error } = require('console');
var smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER,
  auth: {
    user: process.env.MAILER_EMAIL_ID,
    pass: process.env.MAILER_PASSWORD
  }
});

router.post('/forgot', function (req, res, next) {

  let origin = req.headers['origin'];
  console.log(origin);

  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      User.findOne({ email: req.body.email }, function (err, usr) {
        if (!usr) {
          return res.status(500).json({ msg: "No account with that email address exists." });
        }
        let dt = new Date().getTime() + 300000;//3600000;
        usr.resetPasswordToken = token;
        usr.resetPasswordExpires = dt;
        usr.save(function (err) {
          done(err, token, usr);
        });
      });
    },
    function (token, usr, done) {
      var mailOptions = {
        to: usr.email,
        from: 'passwordreset@demo.com',
        subject: 'Demo App forgot password ',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          '' + origin + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        done(err, 'done');
      });
    }
  ], function (err) {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json({ msg: "success" });
  });
});

router.post('/reset', function (req, res, next) {
  console.log(req.body.token);
  console.log(new Date().getTime());
  async.waterfall([
    function (done) {
      let dt = new Date().getTime();
      User.findOne({
        resetPasswordToken: req.body.token,
        resetPasswordExpires: {
          $gt: dt
        }
      },
        function (err, emp) {
          if (!emp) {
            console.log("err");
            return res.status(500).json({ msg: "Password reset token is invalid or has expired." });
          }
          emp.password = bcrypt.hashSync(req.body.password);;
          emp.resetPasswordToken = undefined;
          emp.resetPasswordExpires = undefined;
          emp.save(function (err) {
            done(err, emp);
          });
        });
    },
    function (emp, done) {
      var mailOptions = {
        to: emp.email,
        from: 'passwordreset@demo.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + emp.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        done(err);
      });
    }
  ], function (err) {
    if (err) return res.status(400).json(err);
    return res.status(200).json({ msg: "Your password has been successfully changed" });
  });
});

router.get('/reset/:token', function (req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, emp) {
    if (!emp) {
      console.log(emp)
      console.log("err")
    }
    res.render('reset', {
      emp: req.emp
    });
  });
});

module.exports = router;