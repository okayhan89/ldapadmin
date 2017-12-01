var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

'use strict';

router.post('/', function(req, res, next) {

  var ldap = require('ldapjs');
  const assert = require('assert');

  var client = ldap.createClient({
    url: 'ldap://localhost:389',
    connectTimeout: 5000, //milliseconds
    idleTimeout: 60000,   //milliseconds
  });

  // var entry = {
  //   cn: req.body.email,
  //   sn: req.body.part,
  //   mail: req.body.email,
  //   mobile : req.body.phone,
  //   givenName : req.body.name,
  //   userpassword : req.body.password,
  //   //controls : ['admin'],
  //   objectClass: ['top', 'person', 'organizationalPerson', 'inetOrgPerson']
  // };
  var change = new ldap.Change({
  operation: 'replace', //add, replace, delete
  modification: {
    cn: req.body.email,
    sn: req.body.part,
    mail: req.body.email,
    mobile : req.body.phone,
    givenName : req.body.name,
    userpassword : req.body.password,
    //controls : ['admin'],
    objectClass: ['top', 'person', 'organizationalPerson', 'inetOrgPerson'],
    description: ''
  }
});


  client.bind('cn=admin,dc=btvg2,dc=com', 'g2Arch1!', function(err, res) {
      assert.ifError(err);
      console.log(res);

      //entry.cn = req.body.email;
      client.modify('uid='+req.body.email+',ou='+req.body.company+',dc=btvg2, dc=com', change, function(err, res) {
        assert.ifError(err);
        console.log(res);
        client.unbind();
      });
  });

  // client.bind('cn=admin,dc=btvg2,dc=com', 'g2Arch1!', function(err, res) {
  //   assert.ifError(err);
  //   console.log(res);
  //
  // //  client.add('cn=smint, o=joyent', entry, function(err, res) {
  //   client.modify('uid=test-2@sk.com, dc=btvg2, dc=com', change, function(err, res) {
  //     assert.ifError(err);
  //     console.log(res);
  //   });
  // });
  //
  // console.log("company :", req.body.company);
  // console.log("name :", req.body.name);
  // console.log("password :", req.body.password);
  // console.log("email :", req.body.email);
  // console.log("phone :", req.body.phone);


  res.render('home', { title: 'Express' });
  //res.send(req.body.phone);


});


module.exports = router;
