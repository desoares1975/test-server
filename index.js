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

  let hasVacation = (+req.body.userID === 3);
  let period = hasVacation ? '04/06/18,22/06/18' : null;
  let negativeResponse = hasVacation ? false : ['Você não tem férias agendadas, você poderá realizar a solicitação através do portal do RH.'];
  res.status(200).send({hasVacation, period, negativeResponse});
});

app.post('/paycheck', (req, res) => {
  let relate = [
    false,
    false,
    'ccristina.pdf',
    'asantos.pdf'
  ];
  let paycheck = relate[+req.body.userID] ? relate[+req.body.userID] : false;

  return res.status(200).json({
    'hasPayment': (paycheck ? true : null),
    'file': paycheck ? (`http://mobi.blendit.com.br:3300/downloads/${paycheck}`) : null,
    'paycheckMonth': '02/2018',
    'paidDate': '25/02/2018',
    'negativeResponse': paycheck ? false : 'Não foi possível encontrar o seu contracheque.'
  });
});

app.post('/hours', (req, res) => {
  return res.status(200).json({'hasHours': true, 'hourBank': (+req.body.userID === 3 ? '02:10' : '32:30')});
});