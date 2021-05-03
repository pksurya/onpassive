const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Emp = require('../../models/emp');
const util = require('./utility')

const logger = require('../../logger')

router.post('/add', (req, res) => {
    const EmpAdd = new Emp(req.body);
    let id = util.getNextSequenceValue('employee');
    id.then(v => {
        EmpAdd.Id = v.toString();
        EmpAdd.save().then(o => {
            logger.info(`New employee saved Id:${EmpAdd.Id}`);
            res.json(o)
        });
    });
});


router.get('/list', (req, res) => {
    filterObj = {};
    sortObj = { joinDate: -1 };

    if (util.IsValid(req.query.sort)) {
        let s = req.query.sort.split(" ");
        sortObj = { [s[0]]: [s[1]] }
    }

    if (util.IsValid(req.query.Id)) {
        var obj = {
            'Id': req.query.Id
        }
        filterObj = Object.assign(obj, filterObj);
    }
    if (util.IsValid(req.query.location)) {
        var obj = {
            'location': req.query.location
        }
        filterObj = Object.assign(obj, filterObj);
    }
    if (util.IsValid(req.query.jobTitle)) {
        var obj = {
            'jobTitle': req.query.jobTitle
        }
        filterObj = Object.assign(obj, filterObj);
    }
    if (util.IsValid(req.query.department)) {
        var obj = {
            'department': req.query.department
        }
        filterObj = Object.assign(obj, filterObj);
    }
    if (util.IsValid(req.query.name)) {
        var obj = { $text: { $search: req.query.name } }
        filterObj = Object.assign(obj, filterObj);
    }
    Emp.find(filterObj).sort(sortObj).then(o => { res.json(o) });

});


router.get('/list/:id', (req, res) => {
    Emp.findOne({ _id: mongoose.mongo.ObjectId(req.params.id) }).then(user => { res.json(user) });
});

router.put('/update/:id', (req, res) => {
    Emp.findByIdAndUpdate(mongoose.mongo.ObjectId(req.params.id), { $set: req.body }, function (err, user) {
        if (err) return res.status(400).json(err);
        logger.info(`Employee Updated. Id:${req.body.Id}`);
        return res.status(200).json({ msg: "success" });
    });
});

router.delete('/delete/:id', (req, res) => {
    Emp.findByIdAndDelete(mongoose.mongo.ObjectId(req.params.id)).then(user => {
        logger.info(`Employee Deleted. Id:${req.body.Id}`);
        return res.json(user);
    })
        .catch(err => console.log(err));
});

router.get('/count', (req, res) => {
    Emp.count().then(c => { res.json(c) });
});

module.exports = router;