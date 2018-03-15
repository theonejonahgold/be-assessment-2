/* eslint-disable new-cap */
const router = require('express').Router()

module.exports = router
    .get('/step-1', (req, res) => res.render('create-account/step-1'))
    .get('/step-2', (req, res) => res.render('create-account/step-2'))
    .get('/step-2-selected', (req, res) => res.render('create-account/step-2-selected'))
