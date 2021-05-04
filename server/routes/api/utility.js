var nodemailer = require('nodemailer');

let util = {};
util.getNextSequenceValue = async (sequenceName) => {
    const Counter = require('../../models/counter');
    var sequenceDocument = await Counter.findOneAndUpdate({ key: sequenceName }, { $inc: { value: 1 } }, { new: true }).exec();
    return sequenceDocument.value;
}
util.deepClone = (obj) => {
   return JSON.parse(JSON.stringify(obj));
}
util.IsValid = (obj) => {
    if (typeof obj != 'undefined' && obj != '' && obj != 'All') {
        return true;
    }
    else {
        return false;
    }
}
util.sendMail = (user, normalPassword, key = '') => {
    var smtpTransport = nodemailer.createTransport({
        service: process.env.MAILER_SERVICE_PROVIDER,
        auth: {
            user: process.env.MAILER_EMAIL_ID ,
            pass: process.env.MAILER_PASSWORD 
        }
    });
    var mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Welcome To DemoApp.com',
        text: 'You are receiving this mail because your account has been created.\n\n' +
            'Your login credentials:\n\n' +
            'Username: ' + user.email + '\n\n' +
            'Password: ' + normalPassword + '\n\n\n\n'
    };
    if (key != '') {
        mailOptions.text = mailOptions.text + 'Key: ' + key + '\n'
    }

    smtpTransport.sendMail(mailOptions, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("mail sent");
        //done(err, 'done');
    });
}



module.exports = util;