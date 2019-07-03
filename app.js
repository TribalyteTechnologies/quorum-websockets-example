var Web3 = require('web3');
var TruffleContract =  require('truffle-contract');
var contractAbi = require('./build/contracts/Profile.json');

var web3 = new Web3(new Web3.providers.WebsocketProvider("ws://0.0.0.0/ws", {
    headers: {
    Origin: "test.com"
    }
    }));


web3.eth.net.isListening
().then((res) => {
    console.log('is connected');
}).catch(e => {
    console.log('lost connection' + e);
});

const contractAddress = contractAbi.networks[83584648538].address;
const account = '0x0000000000000000000000000000000000000000';
let truffleContract = TruffleContract(contractAbi);
let contract = new web3.eth.Contract(contractAbi.abi, contractAddress, {
    from: account,
    data: truffleContract.deployedBytecode
});


console.log("Contract Address " + contractAddress);
console.log("The account setted is " + account);

let name = "Name1";
let age = 111;

contract.methods.setProfile(name, age).send({from: account, gas: 220000000})
.then((err, response) => {
    console.log("After setting profile " + JSON.stringify(response));
    return contract.methods.getProfile().call({from: account});
}).then((result) => {
    console.log("Getting profile " + JSON.stringify(result));
}).catch((e) => {
    console.log("Error: " + e);
});