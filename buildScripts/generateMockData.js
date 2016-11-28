var jsf = require('json-schema-faker');
var schema = require('./mockDataSchema')

var fs = require('fs');
var chalk = require('chalk');

/* eslint-disable no-console */

const json = JSON.stringify(jsf(schema));

fs.writeFile("./api/db.json", json, function (err) {
  if (err) {
    return console.log(chalk.red(err));
  } else {
    console.log(chalk.green("Mock data generated."));
  }
});
