const Migrations = artifacts.require("Migrations");
const Web3 = require('web3');
const enviroment = require('../environment')

module.exports = function(deployer) {
  let web3 = new Web3(enviroment.web3Provider_http);
  web3.eth.personal.unlockAccount(enviroment.account, enviroment.accountPass, 600);
  deployer.deploy(Migrations);
};
