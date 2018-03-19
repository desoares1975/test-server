'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

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
    return res.status(200).json({'hasPayment': false, 'file': null});
  }

  fs.readFile(`${__dirname}/static/pdf/${relate[req.body.userID]}`, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json({'hasPayment': true, 'file': data.toString('base64')});
  });
});

app.post('/hours', (req, res) => {
  return res.status(200).json({'hasHours': true, 'hourBank': (+req.body.userID === 3 ? '02:10:15' : '32:10:00')});
});