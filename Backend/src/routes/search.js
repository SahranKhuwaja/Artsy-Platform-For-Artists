const router = require('express').Router();
const User = require('../models/user');
const Chapters = require('../models/artistBooklet');

router.get('/', async (req, res) => {
    try {
        const regex = new RegExp(req.query.q, 'i')
        const queryString = req.query.q.split(' ');
        const split1 = new RegExp(queryString[0], 'i');
        const split2 = new RegExp(queryString[1], 'i');

        let condition = { $or: [{ FirstName: regex }, { LastName: regex }, { FirstName: split1, LastName: split2 }, { FirstName: split2, LastName: split1 }] }
        let data = { 'FirstName': 1, 'LastName': 1, 'DP': 1, 'Role': 1, 'Country': 1, 'City': 1, 'Title': 1 }
        let users;
        if (req.query.r)
            condition = { ...condition, Role: req.query.r }

        if (req.query.country)
            condition = { ...condition, Country: req.query.country }

        if (req.query.city)
            condition = { ...condition, City: req.query.city }

        if (req.query.l)
            users = await User.find(condition, data).limit(parseInt(req.query.l));
        else
            users = await User.find(condition, data);

        res.send({ users });


    } catch (e) {
        console.log(e);
    }
})

module.exports = router;