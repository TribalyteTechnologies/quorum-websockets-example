const Web3 = require('web3');
const contractAbi = require('./build/contracts/Profile.json');
const enviroment = require('./environment');

var web3 = openConnection();

const contractAddress = contractAbi.networks[enviroment.netId].address;
var contract = new web3.eth.Contract(contractAbi.abi, contractAddress);

function newListener() {
    console.log("New Subscription");
    contract.events.changeProfile({
        fromBlock: 0
    }, function (error, event) {
        if(event) {
            console.log("Change Profile Event: " + JSON.stringify(event.returnValues));
        } 
        else if(error) {
            console.log("Connection error: " + JSON.stringify(error));
            web3 = openConnection();
            contract = new web3.eth.Contract(contractAbi.abi, contractAddress);
            newListener();
        }
    });
}


function openConnection() {
    let auxWeb3 = new Web3(new Web3.providers.WebsocketProvider(enviroment.web3Provider_ws, {
        headers: {
            Origin: enviroment.originHeader
        }
    }));
    auxWeb3.eth.net.isListening
    ().then((res) => {
        console.log('Is connected');
    }).catch(e => {
        console.log('Lost connection' + e);
    });
    return auxWeb3;
}

newListener();