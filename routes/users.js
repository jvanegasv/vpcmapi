var express = require('express');
var router = express.Router();

const DbUtils = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getbysql', (req, res, next) => {

  DbUtils.getBySql("select * from services")
  .then((result) => res.json(result))
  .catch(error => res.send(error));

});

router.get('/getbyid', (req, res, next) => {

  DbUtils.getByID("services","service_id",4)
  .then((result) => res.json(result))
  .catch(error => res.send(error));

});

router.get('/insert', (req, res, next) => {

  DbUtils.insertData("services",{
    service_name: 'nuevo service 2',
    service_billing_type: 'UNKNOW',
    service_act: 'N'
  })
  .then((result) => res.json(result))
  .catch(error => res.send(error));

});

router.get('/update', (req, res, next) => {

  DbUtils.updateData("services",{
    service_name: 'nuevo service 2'
  },"service_id = 22")
  .then((result) => res.json(result))
  .catch(error => res.send(error));

});

router.get('/delete', (req, res, next) => {

  DbUtils.deleteData("services","service_id = 12")
  .then((result) => res.json(result))
  .catch(error => res.send(error));

});

module.exports = router;
