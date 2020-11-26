## CONNECTING VIA WEBSOCKET-EXAMPLE

This repository will help us to understand better how to deploy contracts on an Ethereum blockchain, connect to a Quorum regular node, emit and listen to events produced by the smart contracts.

#### Getting Started

Contract deployment is done via Truffle

Install the project and all the required dependencies:

```
git clone https://github.com/TribalyteTechnologies/quorum-websockets-example.git
cd quorum-websockets-example
npm install
```

#### Deploy Contracts

We will compile and deploy contracts on a Quorum Blockchain. For that modify the file environment.js adding a valid node url and providing an account for the contract deployment. 

```
truffle compile
truffle migrate --network telsius
```

Now the contract will be deployed on the specified network and now you are able to interact with them.

#### Interact with Smart Contracts

We are calling smart contract methods that will change the state of the contract an will emit events that will be able to watch.

Executing node ```app.js``` setProfile will be called and change the state of the contract

On other shell execute node ```eventListener.js``` and you will watch the events emited by the contract.


.
