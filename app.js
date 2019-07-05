const Web3 = require('web3');
const TruffleContract = require('truffle-contract');
const contractAbi = require('./build/contracts/Profile.json');
const enviroment = require('./environment');

var web3 = new Web3(new Web3.providers.WebsocketProvider(enviroment.web3Provider_ws, {
    headers: {
        Origin: enviroment.originHeader
    }
}));

web3.eth.net.isListening
    ().then((res) => {
        console.log('Is connected');
    }).catch(e => {
        console.log('Lost connection: ' + e);
    });

const contractAddress = contractAbi.networks[enviroment.netId].address;
const account = enviroment.account;
let truffleContract = TruffleContract(contractAbi);
let contract = new web3.eth.Contract(contractAbi.abi, contractAddress, {
    from: account,
    data: truffleContract.deployedBytecode
});

console.log("Contract Address " + contractAddress);
console.log("The account setted is " + account);


let name = "NAME1";
let age = 111;

contract.methods.setProfile(name, age).send({ from: account, gas: 220000000 })
.then((response) => {
    console.log("After setting profile " + JSON.stringify(response));
    return contract.methods.getProfile().call({ from: account });
}).then((result) => {
    console.log("Getting profile " + JSON.stringify(result));
}).catch((e) => {
    console.log("Error: " + e);
});