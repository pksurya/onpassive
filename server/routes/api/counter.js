const express = require('express');
const router = express.Router();
const Counter = require('../../models/counter');

router.post('/add', (req, res) => {
    const CounterAdd = new Counter(req.body);
    CounterAdd.save().then(addRole => res.json(addRole));
});
router.get('/list', (req, res) => {
    Counter.find().then(Roles => { res.json(Roles) });
});
module.exports = router;