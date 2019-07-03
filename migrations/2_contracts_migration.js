const Profile = artifacts.require("./Profile.sol");

module.exports = function(deployer) {
  console.log("You are deploying a new contract");
  return deployer.deploy(Profile);
};
