var Web3 = require('web3');
var contractAbi = require('./build/contracts/Profile.json');

var web3 = new Web3(new Web3.providers.WebsocketProvider("ws://0.0.0.0/ws", {
    headers: {
    Origin: "test.com"
    }
    }));


web3.eth.net.isListening
().then((res) => {
    console.log('Is connected');
}).catch(e => {
    console.log('lost connection' + e);
});


const contractAddress = contractAbi.networks[83584648538].address;

var contract = new web3.eth.Contract(contractAbi.abi, contractAddress);

contract.events.changeProfile({
    fromBlock: 0
}, function(error, event) {
    console.log("Change Profile Event: " + JSON.stringify(event.returnValues));
})