module.exports = {
  networks: {
    development: {
    host: "127.0.0.1",     // Localhost (default: none)
    port: 8545,            // Standard Ethereum port (default: none)
    network_id: "*",       // Any network (default: none)
    },
    telsius: {
      host: "0.0.0.0",     // Localhost (default: none)
      port: 22000,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      from: '0x00000000000000000000000000000000000',
      gas: 2000000,
      gasPrice: 0
    }
  },
  compilers: 
  {
    solc: 
    {
    version: "0.4.24", // A version or constraint - Ex. "^0.5.0"
              // Can also be set to "native" to use a native solc
    }
  }
}
