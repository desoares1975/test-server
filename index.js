'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(`${__dirname}/static`));
app.listen(8809, () => {
  console.log('App up pand running on port 8809');
});
app.use(bodyParser.urlencoded({'extended': true}));
app.use(bodyParser.json());

app.post('/leave', (req, res) => {

  let hasVacation = +req.body.userID === 3;
  let period = hasVacation ? '04/06/18,22/06/18' : null;
  res.status(200).send({hasVacation, period});
});

app.post('/paycheck', (req, res) => {
  let relate = [
    false,
    false,
    'ccristina.pdf',
    'asantos.pdf'
  ];

  if (!relate[req.body.userID]) {
    return res.status(200).json({'hasPayment': false, 'file': null, 'paycheckMonth': '02/2018', 'paidDate': '25/02/2018' });
  }

  return res.status(200).json({
    'hasPayment': true,
    'file': `http://mobi.bledit.com.br:3300/downloads/${relate[req.body.userID]}`,
    'paycheckMonth': '02/2018',
    'paidDate': '25/02/2018'});
});

app.post('/hours', (req, res) => {
  return res.status(200).json({'hasHours': true, 'hourBank': (+req.body.userID === 3 ? '02:10' : '32:30')});
});