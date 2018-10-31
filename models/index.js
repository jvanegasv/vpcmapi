'use strict';

const _ = require('underscore');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// VPCM DB UTILITIES

// get by SQL return array or ERROR
const getBySql = (sqlQuery) => {

  const promise = new Promise((resolve, reject) => {

    sequelize.query(sqlQuery, { type: sequelize.QueryTypes.SELECT})
    .then(data => resolve(data))
    .catch(error => reject(error));
  });

  return promise;
}

// get by ID return array OR ERROR
const getByID = (tableName, idKey, idValue) => {

  const promise = new Promise((resolve, reject) => {

    const sqlQuery = `SELECT * FROM ${ tableName } WHERE ${ idKey } = ${ idValue}`;
    sequelize.query(sqlQuery, { type: sequelize.QueryTypes.SELECT})
    .then(data => resolve(data))
    .catch(error => reject(error));
  });

  return promise;
}

// insert return new id generated OR ERROR
const insertData = (tableName, data) => {

  const promise = new Promise((resolve, reject) => {

    const sqlQuery = 'INSERT INTO ' + tableName + ' (' + _.keys(data).join(',') + ') VALUES (:' + _.keys(data).join(',:') + ')'; 
    sequelize.query(sqlQuery, { replacements: data })
    .spread((results, metadata) => resolve(results))
    .catch(error => reject(error));
  });

  return promise;
}

// update return {"fieldCount":0,"affectedRows":0,"insertId":0,"info":"Rows matched: 0  Changed: 0  Warnings: 0","serverStatus":2,"warningStatus":0,"changedRows":0} OR ERROR
const updateData = (tableName, data, condition) => {

  const promise = new Promise((resolve, reject) => {

    let toUpdate = [];
    _.keys(data).forEach(element => {
      toUpdate.push(`${ element } = :${ element }`);
    });
    const sqlQuery = 'UPDATE ' + tableName + ' SET ' + toUpdate.join(',') + ' WHERE ' + condition; 
    sequelize.query(sqlQuery, { replacements: data })
    .spread((results, metadata) => resolve(results))
    .catch(error => reject(error));
  });

  return promise;
}

// delete return {"fieldCount":0,"affectedRows":1,"insertId":0,"info":"","serverStatus":2,"warningStatus":0} OR ERROR
const deleteData = (tableName, condition) => {

  const promise = new Promise((resolve, reject) => {

    const sqlQuery = 'DELETE FROM ' + tableName + ' WHERE ' + condition; 
    sequelize.query(sqlQuery)
    .spread((results, metadata) => resolve(results))
    .catch(error => reject(error));
  });

  return promise;
}

db.getBySql = getBySql;
db.getByID = getByID;
db.insertData = insertData;
db.updateData = updateData;
db.deleteData = deleteData;

module.exports = db;
