const enviroment = require('./enviroment')

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    telsius: {
      host: enviroment.urlHost,     // Localhost (default: none)
      port: 22000,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      from: enviroment.account,
      gas: 2000000,
      gasPrice: 0
    }
  },
  compilers:
  {
    solc:
    {
      version: "0.4.24"
    }
  }
}
